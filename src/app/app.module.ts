import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GpDevicesAtRiskWidgetModule } from './../../projects/gp-devices-at-risk-widget/src/lib/gp-devices-at-risk-widget.module';
import { RouterModule } from '@angular/router';
import { InventoryService, Realtime } from '@c8y/ngx-components/api';
import { AppStateService, OptionsService } from '@c8y/ngx-components';
import { AppComponent } from './app.component';
import { BehaviorSubject } from 'rxjs';
import { CoreModule } from '@c8y/ngx-components';
import {
  BasicAuth,
  Client,
  IdentityService,
  ApplicationService,
  AlarmService,
  AuditService,
  DeviceRegistrationService,
  FetchClient,
  DeviceRegistrationBulkService,
  EventService,
  InventoryRoleService,
  InventoryBinaryService,
  MeasurementService,
  OperationService,
  OperationBulkService,
  TenantSecurityOptionsService,
  SystemOptionsService,
  TenantOptionsService,
  TenantService,
  UserService,
  UserGroupService,
  UserRoleService,
  IUser,
  ICurrentTenant} from '@c8y/client';

const auth = new BasicAuth({

});
const client = new Client(auth, '');
client.setAuth(auth);
const fetchClient = client.core;
@Injectable()
export class MockAppStateService {
  currentTenant = new BehaviorSubject<ICurrentTenant | null>(null);
  currentUser = new BehaviorSubject<IUser | null>(null);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    GpDevicesAtRiskWidgetModule,
    RouterModule.forRoot([]),
    CoreModule.forRoot()
  ],
  providers: [

      {
        provide: IdentityService,
        useFactory: () => {
          return new IdentityService(fetchClient);
        }
      },
      {
        provide: ApplicationService,
        useFactory: () => {
            return new ApplicationService(fetchClient, client.realtime);
            }
        },
        { provide: InventoryService, useValue: client.inventory},
        { provide: Realtime, useValue: client.realtime},
        { provide: AlarmService, useValue: client.alarm },
        { provide: ApplicationService, useValue: client.application },
        { provide: AuditService, useValue: client.audit },
        { provide: FetchClient, useValue: client.core },
        { provide: DeviceRegistrationService, useValue: client.deviceRegistration },
        { provide: DeviceRegistrationBulkService, useValue: client.deviceRegistrationBulk },
        { provide: EventService, useValue: client.event },
        { provide: InventoryService, useValue: client.inventory },
        { provide: InventoryRoleService, useValue: client.inventoryRole },
        { provide: InventoryBinaryService, useValue: client.inventoryBinary },
        { provide: MeasurementService, useValue: client.measurement },
        { provide: OperationService, useValue: client.operation },
        { provide: OperationBulkService, useValue: client.operationBulk },
        { provide: TenantSecurityOptionsService, useValue: client.options.security },
        { provide: SystemOptionsService, useValue: client.options.system },
        { provide: TenantOptionsService, useValue: client.options.tenant },
        { provide: Realtime, useValue: client.realtime },
        { provide: TenantService, useValue: client.tenant },
        { provide: UserService, useValue: client.user },
        { provide: UserGroupService, useValue: client.userGroup },
        { provide: UserRoleService, useValue: client.userRole },
        { provide: IdentityService, useValue: client.identity },
        { provide: AppStateService, useClass: MockAppStateService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
