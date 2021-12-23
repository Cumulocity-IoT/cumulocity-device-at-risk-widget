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
import { NgModule } from '@angular/core';
import {CoreModule, HOOK_COMPONENTS} from '@c8y/ngx-components';
import { GpDevicesAtRiskWidgetComponent } from './gp-devices-at-risk-widget.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
//import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GpDevicesAtRiskWidgetConfigComponent } from './gp-devices-at-risk-widget-config/gp-devices-at-risk-widget-config.component';
import { GpDevicesAtRiskWidgetService } from './gp-devices-at-risk-widget.service';
import * as preview from './preview-image';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatDialogModule} from '@angular/material/dialog';
import { GpAlertModalComponent} from './gp-modal/gp-alert-modal.component';

@NgModule({
  declarations: [GpDevicesAtRiskWidgetComponent, GpDevicesAtRiskWidgetConfigComponent, GpAlertModalComponent],
  imports: [
    MatTableModule,
    //MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    CoreModule,
    MatSelectModule,
    NgSelectModule,
    MatDialogModule
  ],

  exports: [GpDevicesAtRiskWidgetComponent, GpDevicesAtRiskWidgetConfigComponent, GpAlertModalComponent],
  entryComponents: [GpDevicesAtRiskWidgetComponent, GpDevicesAtRiskWidgetConfigComponent, GpAlertModalComponent],
  providers: [
    GpDevicesAtRiskWidgetService,
    {
    provide: HOOK_COMPONENTS,
    multi: true,
    useValue: {
        id: 'devices-at-risk.widget',
        label: 'Devices At Risk',
        previewImage: preview.previewImage,
        description: 'Devices at Risk Dashboard - Displays all the devices with risk levels in the dashboard',
        component: GpDevicesAtRiskWidgetComponent,
        configComponent: GpDevicesAtRiskWidgetConfigComponent,
        data: {
            ng1: {
                options: {
                noDeviceTarget: false,
                noNewWidgets: false,
                deviceTargetNotRequired: false,
                groupsSelectable: true
                }
            }
        }
    }
    }],
})
export class GpDevicesAtRiskWidgetModule { }
