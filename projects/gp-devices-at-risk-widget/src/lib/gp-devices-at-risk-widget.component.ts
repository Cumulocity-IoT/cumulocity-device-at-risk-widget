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
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GpDevicesAtRiskWidgetService, Device } from './gp-devices-at-risk-widget.service';
import { Subject, from } from 'rxjs';
import { Router } from '@angular/router';
import { InventoryService, Realtime } from '@c8y/ngx-components/api';
import { GpAlertModalComponent} from './gp-modal/gp-alert-modal.component';
import { MatDialog } from '@angular/material';
import { IdReference } from '@c8y/client';
@Component({
  selector: 'lib-gp-devices-at-risk-widget',
  templateUrl: 'gp-devices-at-risk-widget.html',
  styleUrls: ['material-grid.component.css']
})
export class GpDevicesAtRiskWidgetComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Device>([]);
  realtimeState = true;
  configDashboardList = [];
  realTimeDeviceSub: object;
  appId = '' ;
  unsubscribeRealTime$ = new Subject<void>();
  @Input() config: { device: { id: IdReference; }; tProps: ConcatArray<string>; pageSize: any; dashboardList: any; };
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private devicelist: GpDevicesAtRiskWidgetService,
    private inventory: InventoryService,
    private router: Router,
    public realtimeService: Realtime,
    public dialog: MatDialog) { }
    toggle() {
      this.realtimeState = !this.realtimeState;
      if (this.realtimeState) {
        this.handleReatime();
      } else {
        this.unsubscribeRealTime$.next();
      }
    }
    async handleReatime() {
      const inventory = await this.inventory.detail(this.config.device.id);
      const response = inventory.data;
      // Check that the response is a Group and not a device
      if (response.hasOwnProperty('c8y_IsDevice')) {
        alert('Please select a group for this widget to fuction correctly'); } else {
        const devicesAll = response.childAssets.references;
        devicesAll.map(async (device) => {
          // tslint:disable-next-line: deprecation
          this.inventory.detail$(device.managedObject.id, {
            hot: true,
            realtime: true
          })
          .subscribe((data) => {
             this.manageRealtime(data[0]);
          });
        });
        }
    }

    async manageRealtime(childDevice: { id: string; }) {
      if (this.realtimeState) {

        const tableData = this.dataSource.data.filter(singleDevice => singleDevice.id !== childDevice.id);
        const x = await this.devicelist.fetchData(childDevice, this.displayedColumns);
        if ( x != null) {
          if (x.availability === 'PARTIAL' || x.alarms || x.firmware || x.availability === 'UNAVAILABLE') {
            tableData.push(x);
          }
        }
        this.dataSource.data = [...tableData];
        }
      }
  async ngOnInit() {
    this.displayedColumns = this.displayedColumns.concat(this.config.tProps ? this.config.tProps : []);
    this.dataSource.data = await this.devicelist.getDeviceList(this.config, this.displayedColumns);
    this.appId = this.devicelist.getAppId();
    this.configDashboardList = this.config.dashboardList;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.handleReatime();
  }
  ngOnDestroy(): void {
    this.unsubscribeRealTime$.next();
    this.unsubscribeRealTime$.complete();
  }
  async refresh() {
    this.dataSource.data = await this.devicelist.getDeviceList(this.config, this.displayedColumns);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
   // Navigate URL to dashboard if dashboard is exist else it will redirect to dialog box to create new Dasboard
selectedRecord(id: any, deviceType: string ) {
    if (deviceType && this.appId) {
      const dashboardObj = this.configDashboardList.find((dashboard) => dashboard.type === deviceType);
      if (dashboardObj && dashboardObj.dashboarId) {

        if (dashboardObj.withTabGroup) {
          this.router.navigate([
            `/application/${this.appId}/tabgroup/${id}/dashboard/${dashboardObj.dashboarId}/device/${id}`]);
        } else if (dashboardObj.tabGroupID) {
          this.router.navigate([
            `/application/${this.appId}/tabgroup/${dashboardObj.tabGroupID}/dashboard/${dashboardObj.dashboarId}/device/${id}`]);
        } else {
          this.router.navigate([`/application/${this.appId}/dashboard/${dashboardObj.dashboarId}/device/${id}`]);
        }
      } else {
        this.openDialogManual(' No dashboard available for ' + id);

      }
    } else if (deviceType) {
      this.router.navigate([`/device/${id}`]);
    }
  }

  private openDialogManual(message) {
    const dialogRef = this.dialog.open(GpAlertModalComponent, {
      width: '50vh',
      data: { message }
    });
  }

}
