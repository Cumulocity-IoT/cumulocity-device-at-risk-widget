/*
* Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { Injectable } from '@angular/core';
import { IdentityService, IManagedObject, IResultList } from '@c8y/client';
import { InventoryService, Realtime } from '@c8y/ngx-components/api';
@Injectable()

export class GpDevicesAtRiskWidgetService {

  constructor(public inventory: InventoryService,
              public identity: IdentityService,
              public realtimeService: Realtime,
               ) {}

// Variables
response: any;
deviceResponse: any;
dataSource: any;
devicesAll: any;
alldeviceid: any;
realTimeDeviceSub;


devicesAtRisk: Device[] = [];
latestFirmwareVersion = 0;
getAppId() {
  const currentURL = window.location.href;
  const routeParam = currentURL.split('#');
  if (routeParam.length > 1) {
    const appParamArray = routeParam[1].split('/');
    const appIndex = appParamArray.indexOf('application');
    if (appIndex !== -1) {
      return appParamArray[appIndex + 1];
    }
  }
  return '';
}
getAllDevices(pageToGet: number, allDevices: { data: any[], res: any }): Promise<IResultList<IManagedObject>> {
  const inventoryFilter = {
    fragmentType: 'c8y_IsDevice',
    pageSize: 2000,
    withTotalPages: true,
    currentPage: pageToGet
  };
  if (!allDevices) {
    allDevices = { data: [], res: null };
  }

  return new Promise(
    (resolve, reject) => {
      this.inventory.list(inventoryFilter)
        .then((resp) => {
          if (resp.res.status === 200) {
            if (resp.data && resp.data.length >= 0) {
              allDevices.data.push.apply(allDevices.data, resp.data);
              if (resp.data.length < inventoryFilter.pageSize) {
                resolve(allDevices);
              } else {
                this.getAllDevices(resp.paging.nextPage, allDevices)
                  .then((np) => {
                    resolve(allDevices);
                  })
                  .catch((err) => reject(err));
              }
            }
          } else {
            reject(resp);
          }
        });
    });

}
async getDeviceList(config, displayedColumns) {
this.alldeviceid = [];
// Clear array
this.devicesAtRisk.length = 0;

const inventory = await this.inventory.detail(config.device.id);


this.response = inventory.data;

const firmwareData = await this.inventory.list({ type: 'sag_racm_currentFirmware' });
if (firmwareData.data.length > 0) {
  this.latestFirmwareVersion = firmwareData.data[0].firmware.version;
}

// Check that the response is a Group and not a device
if (this.response.hasOwnProperty('c8y_IsDevice')) {
alert('Please select a group for this widget to fuction correctly'); } else {
// Get List of devices
this.devicesAll = this.response.childAssets.references;

// Check each device to see if there are any active ale rts
// MAP***********************
const promises = this.devicesAll.map(async (device) => {

  // tslint:disable-next-line: no-shadowed-variable
  const inventory = await this.inventory.detail(device.managedObject.id);
  this.alldeviceid.push(device.managedObject.id);
  const childDevice = inventory.data;
   // Get External Id
  const x = await this.fetchData(childDevice, displayedColumns);

  if ( x != null ) {
    if (x.availability === 'PARTIAL' || x.alarms || x.firmware || x.availability === 'UNAVAILABLE' ) {
      this.devicesAtRisk.push(x);
    }
   }
});

await Promise.all(promises);

}
this.devicesAtRisk.sort((a, b) => (a.alarms.localeCompare(b.alarms)) );

return this.devicesAtRisk;

}
async fetchData(childDevice, displayedColumns) {
let childdeviceAvail = '';
let majorAlerts = false;
let minorAlerts = false;
let criticalAlerts = false;
let majorAlerts1 = false;
let minorAlerts1 = false;
let criticalAlerts1 = false;
let atRisk = false;
let alertDesc = '';
let firmwaredesc = '';
if (childDevice) {

displayedColumns.map(async (column) => {
 if (column === 'firmware') {
   const firmwareStatus = childDevice.c8y_Firmware;
   let versionIssues = 0;
   if (firmwareStatus  && firmwareStatus.version) {
     versionIssues = firmwareStatus.version - this.latestFirmwareVersion;
    }
   if (versionIssues < 0) {
      atRisk = true; }
   if ( atRisk) {
        if (atRisk) {
          if (versionIssues >= 0) {
            firmwaredesc = 'No Risk';
          } else if (versionIssues === -1) {
            firmwaredesc = 'Low Risk';
          } else if (versionIssues === -2) {
            firmwaredesc = 'Medium Risk';
          } else if (versionIssues <= -3) {
            firmwaredesc = 'High Risk';
          }
        }
  }
 }
});

let dashboardId = '';
let tabGroup = '';
let type = '';
if (childDevice.deviceListDynamicDashboards && childDevice.deviceListDynamicDashboards.length > 0) {
     dashboardId = childDevice.deviceListDynamicDashboards[0].dashboardId;
     tabGroup = childDevice.deviceListDynamicDashboards[0].tabGroup;
   }
if (childDevice.type) {type = childDevice.type; }
const identity = await this.identity.list(childDevice.id);
if (identity.data.length > 0) {
    const externalId = identity.data[0].externalId;
    childDevice.externalId = externalId;
}
let parentCounter = 0;
if (childDevice.childDevices.references.length > 0) {

     const childdevices1 = childDevice.childDevices.references;

     const promises1 = childdevices1.map(async (device) => {
    const inventory1 = await this.inventory.detail(device.managedObject.id);
    this.alldeviceid.push(device.managedObject.id);
     // tslint:disable-next-line: variable-name
    const child_childDevice = inventory1.data;
    // Check is Connected or UnConnected
    // tslint:disable-next-line: max-line-length
    if (childDevice.hasOwnProperty('c8y_Availability') && child_childDevice.hasOwnProperty('c8y_Availability') && childDevice.c8y_Availability.status === 'AVAILABLE' && child_childDevice.c8y_Availability.status === 'AVAILABLE') {

            childdeviceAvail = 'AVAILABLE';
      // tslint:disable-next-line: max-line-length
      } else if (childDevice.hasOwnProperty('c8y_Availability') && child_childDevice.hasOwnProperty('c8y_Availability') && childDevice.c8y_Availability.status === 'AVAILABLE' && child_childDevice.c8y_Availability.status === 'UNAVAILABLE') {
             childdeviceAvail = 'PARTIAL';
      // tslint:disable-next-line: max-line-length
      } else if (childDevice.hasOwnProperty('c8y_Availability') && child_childDevice.hasOwnProperty('c8y_Availability') && childDevice.c8y_Availability.status === 'UNAVAILABLE' && child_childDevice.c8y_Availability.status === 'AVAILABLE') {
        childdeviceAvail = 'PARTIAL';
      } else  {
            childdeviceAvail = 'UNAVAILABLE';
        }

    const activeAlerts = childDevice.c8y_ActiveAlarmsStatus;
    const childactiveAlerts = child_childDevice.c8y_ActiveAlarmsStatus;

    if (activeAlerts !== undefined && parentCounter === 0) {
          if (activeAlerts.hasOwnProperty('minor')) {
            if (activeAlerts.minor > 0) { minorAlerts = true; }
          }
          if (activeAlerts.hasOwnProperty('major')) {
           if (activeAlerts.major > 0) { majorAlerts = true; }
         }
          if (activeAlerts.hasOwnProperty('critical')) {
           if (activeAlerts.critical > 0) { criticalAlerts = true; }
         }
          if (minorAlerts || majorAlerts || criticalAlerts) {

          // Add Alert information

          // tslint:disable-next-line: no-shadowed-variable
          if (minorAlerts) { alertDesc += 'Minor(' + childDevice.c8y_ActiveAlarmsStatus.minor + ')'; }
          if (criticalAlerts) { alertDesc += 'Critical(' + childDevice.c8y_ActiveAlarmsStatus.critical + ')'; }
          if (majorAlerts) { alertDesc += 'Major(' + childDevice.c8y_ActiveAlarmsStatus.major + ')'; }

        }
          parentCounter += 1;
        }
        // tslint:disable-next-line: no-trailing-whitespace
        
    if (childactiveAlerts !== undefined) {
          if (childactiveAlerts.hasOwnProperty('minor')) {
            if (childactiveAlerts.minor > 0) { minorAlerts1 = true; }
          }
          if (childactiveAlerts.hasOwnProperty('major')) {
           if (childactiveAlerts.major > 0) { majorAlerts1 = true; }
         }
          if (childactiveAlerts.hasOwnProperty('critical')) {
           if (childactiveAlerts.critical > 0) { criticalAlerts1 = true; }
         }

          if (minorAlerts1 || majorAlerts1 || criticalAlerts1) {

          // Add Alert information
          // tslint:disable-next-line: no-shadowed-variable
          if (minorAlerts1) { alertDesc += 'Minor(' + child_childDevice.c8y_ActiveAlarmsStatus.minor + ')'; }
          if (criticalAlerts1) { alertDesc += 'Critical(' + child_childDevice.c8y_ActiveAlarmsStatus.critical + ')'; }
          if (majorAlerts1) { alertDesc += 'Major(' + child_childDevice.c8y_ActiveAlarmsStatus.major + ')'; }
        }
        }
      });
     await Promise.all(promises1);
      } else {
      if (childDevice.hasOwnProperty('c8y_Availability') && childDevice.c8y_Availability.status === 'AVAILABLE') {
        childdeviceAvail = 'AVAILABLE';
      } else {
        childdeviceAvail = 'UNAVAILABLE';
      }

      const activeAlerts = childDevice.c8y_ActiveAlarmsStatus;

      if (activeAlerts !== undefined) {
  if (activeAlerts.hasOwnProperty('minor')) {
    if (activeAlerts.minor > 0) { minorAlerts = true; }
  }
  if (activeAlerts.hasOwnProperty('major')) {
   if (activeAlerts.major > 0) { majorAlerts = true; }
 }
  if (activeAlerts.hasOwnProperty('critical')) {
   if (activeAlerts.critical > 0) { criticalAlerts = true; }
 }
}
      if (minorAlerts || majorAlerts || criticalAlerts) {

  // Add Alert information

  // tslint:disable-next-line: no-shadowed-variable
  if (minorAlerts) { alertDesc += 'Minor(' + childDevice.c8y_ActiveAlarmsStatus.minor + ')'; }
  if (criticalAlerts) { alertDesc += 'Critical(' + childDevice.c8y_ActiveAlarmsStatus.critical + ')'; }
  if (majorAlerts) { alertDesc += 'Major(' + childDevice.c8y_ActiveAlarmsStatus.major + ')'; }

}
    }

const temp: Device = {
    id: childDevice.id,
    name: childDevice.name,
    type,
    alarms: alertDesc,
    firmware: (firmwaredesc ? firmwaredesc : ''),
    connection: (childDevice.c8y_Connection && childDevice.c8y_Connection.status ? childDevice.c8y_Connection.status : ''),
    availability: childdeviceAvail,
    externalid: childDevice.externalId,
    dashboardId,
    tabGroup
   };

return temp;
  }
return null;
  }
}

export interface Device {
  id?: string;
  name?: string;
  type?: string;
  alarms?: string;
  firmware?: string;
  connection?: string;
  availability?: string;
  externalid?: string;
  dashboardId?: string;
  tabGroup?: string;
}
