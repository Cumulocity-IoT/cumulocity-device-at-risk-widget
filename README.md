# Cumulocity Devices at Risk Widget<img width="35" src="https://user-images.githubusercontent.com/67993842/97668428-f360cc80-1aa7-11eb-8801-da578bda4334.png"/>

This is an Angular 8 widget designed to get a list of devices based on a group selection and display any device that has a Critical/Major Alarm or Medium/High-Risk Firmware raised against it.
One can also see the Availability of those devices and can also view the data both in Real-time/offline mode.

![device_atrisk](https://user-images.githubusercontent.com/89508319/132515927-02e893de-7eb6-475b-af71-073b000c4bfe.png)


 ## Features
 - Display Assets/Devices: Displays Assets/Devices for give group in
   Tile/Grid mode. 
   
 - It also supports child devices/assets.  
 - Pagination: Configurable Paginations and option to set default page size.


## Installation
### Runtime Widget Deployment?

 - This widget support runtime deployment. Download  [Runtime Binary](https://github.com/SoftwareAG/cumulocity-device-at-risk-widget/releases/download/1.0.5/device-at-risk-runtime-widget-1.0.5.zip)  and follow runtime deployment instructions from  [here](https://github.com/SoftwareAG/cumulocity-runtime-widget-loader).

### Installation of widget through App Builder or Cockipt Deployment?

**Supported Cumulocity Environments:**

 -  **App Builder:**  Tested with Cumulocity App Builder version 1.2.6.

-   **Cockpit Application:**  Tested with Cockpit 1009.0.4 with  [Patch Fix](https://github.com/SoftwareAG/cumulocity-runtime-widget-loader).

**Requirements:**
-   Git
    
-   NodeJS (release builds are currently built with  `v12.19.0`)
    
-   NPM (Included with NodeJS)

**External dependencies:**

```
"@angular/material": "^8.2.3"

"@ng-select/ng-select": "^3.7.3"
```

**Installation Steps For App Builder:**
**Note:**  If you are new to App Builder or not yet downloaded/clone app builder code then please follow  [App builder documentation(Build Instructions)](https://github.com/SoftwareAG/cumulocity-app-builder)  before proceeding further.

1.  Open Your existing App Builder project and install external dependencies by executing below command or install it manually.
    
    ```
    
    npm i @angular/material@8.2.3 @ng-select/ng-select@3.7.3
    
    ```
    
2.  Grab the Device at risk widget  **[Latest Release Binary](https://github.com/SoftwareAG/cumulocity-device-at-risk-widget/releases/download/1.0.5/gp-device-at-risk-1.0.5.tgz)**.
    
3.  Install the Binary file in app builder.
    
    ```
    
    npm i <binary file path>/gp-devices-at-risk-widget.tgz
    
    ```
    
4.  Import DevicesAtRisk Module

Import GpDevicesAtRiskWidgetModule in app.module.ts and also place the imported Module under  `@NgModule`.

```
import { GpDevicesAtRiskWidgetModule } from 'gp-devices-at-risk-widget';
@NgModule({
  imports: [
    GpDevicesAtRiskWidgetModule
      ]
  })
```    
5.  Congratulation! Installation is now completed. Now you can run app builder locally or build and deploy it into your tenant.
    
    ```
    //Start App Builder
    
    npm run start
    
    // Build App
    
    
    npm run build
    
    
    // Deploy App
    
    
    npm run deploy

    
   **Installation Steps For Cockpit:**

**Note:**  If you are new to Cockpit or not yet created any cockpit application then please follow  [Web SDK for Angular](https://cumulocity.com/guides/web/angular/)  before proceeding further.

1.  Open Your existing Cockpit/Cumulocity project and install external dependencies by executing below command or install it manually.
    
    ```
    
    npm i @angular/material@8.2.3 @ng-select/ng-select@3.7.3
    
    
    ```
    
2.  Grab the Asset Viewer widget  **[Latest Release Binary](https://github.com/SoftwareAG/cumulocity-device-at-risk-widget/releases/download/1.0.5/gp-device-at-risk-1.0.5.tgz)**
    
3.  Install the Binary file in your project.
    
    ```
    npm i <binary file path>/gp-device-at-risk-x.x.x.tgz
    
    ```
    
4.  Import GpDevicesAtRiskWidgetModule in app.module.ts file located at /cumulocity-app/
    
    ```
    
    import {GpDevicesAtRiskWidgetModule} from  'gp-device-at-risk';
    
    @NgModule({
    
    imports: [
    GpDevicesAtRiskWidgetModule
    ]
    })
    
5.  Congratulation! Installation is now completed. Now you can run your app locally or build and deploy it into your tenant.
    
    ```
    
    //Start Cumulocity App
    
    
    
    npm run start
    
    
    
    // Build App
    
    
    
    npm run build
    
    
    // Deploy App
    
    
    
    npm run deploy
    
   ## Build Instructions

**Note:**  It is only necessary to follow these instructions if you are modifying/extending this widget, otherwise see the  [Installation Guide](https://github.com/SoftwareAG/cumulocity-device-at-risk-widget#Installation).

**Requirements:**

-   Git
    
-   NodeJS (release builds are currently built with  `v12.19.0`)
    
-   NPM (Included with NodeJS)
    

**Instructions**

1.  Clone the repository:
    
    ```
    
    git clone https://github.com/SoftwareAG/cumulocity-devices-at-risk-widget.git

    
    
    ```
    
2.  Change directory:
    
    ```
    
    cd cumulocity-devices-at-risk-widget
    
    
    ```
    
3.  (Optional) Checkout a specific version:
    
    ```
    
    git checkout <your version>
    
    
    ```
    
4.  Install the dependencies:
    
    ```
    
    npm install
    
    
    ```
    
5.  (Optional) Local development server:
    
    ```
    
    ng serve
    
    
    ```
    
6.  Build the app:
    
    ```
    
    npm run buildPatch
    
    
    ```
    
7.  Deploy the app: Follow the  [Installation instructions](https://github.com/SoftwareAG/cumulocity-devices-at-risk-widget#Installation)


## QuickStart

This guide will teach you how to add widget in your existing or new dashboard.

**NOTE:**  This guide assumes you have followed the  [Installation instructions](https://github.com/SoftwareAG/cumulocity-device-at-risk-widget#Installation)

1.  Open you application from App Switcher
    
2.  Add new dashboard or navigate to existing dashboard
    
3.  Click  `Add Widget`
    
4.  Search for  `Device at risk`
    
5.  Select  `Target Assets or Devices`
    
6.  Click  `Save`
    

Congratulations! Device at risk widget is configured.

## User Guide

Click on Add Widget and select Devices at Risk as a widget. In the configuration, you only need to select the device group of interest.


This widget is provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.

----------

For more information you can Ask a Question in the  [TECHcommunity Forums](https://tech.forums.softwareag.com/tag/Cumulocity-IoT).
