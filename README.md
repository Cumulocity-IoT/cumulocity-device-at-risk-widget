# *Devices at Risk Widget*

{{toc}}

## Overview

This is an Angular 7 widget designed to get a list of devices based on a group selection and display any device that has a Critical/Major Alarm or Medium/High-Risk Firmware raised against it.

One can also see the Availability of those devices and can also view the data both in Real-time/offline mode.

## Representation

Devices at Risk Widget / Assets at Risk view 

![](Assets_at_Risk.PNG)


## Owners

Contact the owner for more information and feedback: Matthew.Barnes@softwareag.com

Alternatively, create an issue in the Issues tab at the top of the window if found (see also the troubleshooting section below).


## Supported Product Versions

Cumulocity 1005.0.3 onward (should also work for an older version of Cumulocity)

## Prerequisites

##### Nodejs and npm package Installation

 -  Go through the following link to Install Nodejs and npm package
     [Nodejs and npm package Installtion](https://treehouse.github.io/installation-guides/windows/node-windows.html)

   ##### Angular version 
  - Angular CLI version 7.3.9 (Angular 7).
    
    Installation command:
     ```cmd
    npm install -g  @angular/cli@7.3.9 
    ``` 

   ##### Mandatory Library for Widget
  - Angular CDK version 7.3.7
    Installation command:  ```npm i @angular/cdk@7.3.7 ``` 

  - Angular Material version 7.3.7
     Installation command: ```npm i @angular/material@7.3.7 ``` 

  - Cumulocity Library: 
      Installation command : 

 ```cmd
npm install @c8y/client
npm install @c8y/ngx-components 
npm install @c8y/style
npm install @c8y/ng1-modules
``` 
**Note: This widget can be used as a custom widget in both cockpit and cumulocity-app-builder application**

 ## Devices at Risk widget as a custom widget for Cockpit Application 

  1. Use your existing cockpit application or please refer  [Cumulocity  Guide](https://cumulocity.com/guides/web/how-to/#add-a-custom-widget) to create a new cockpit application.
  2. Make sure to install all pre-specified Mandatory Library under [Prerequisites](https://labcase.softwareag.com/projects/c8y-devices-at-risk/wiki/Wiki#Prerequisites) in your cockpit application.
    So that your application has the following entries in `package.json `.
```
"@angular/cdk": "7.3.7",
"@angular/material": "7.3.7",
"core-js": "^2.6.2",
"@c8y/ngx-components": "^1005.0.3",
"@c8y/ng1-modules": "^1005.0.3",
"@c8y/style": "^1005.0.3",
 ```

**Note: Even if some of the libraries are available please do install, that will only update the library which is already available with latest changes and also update its dependencies.
**
###  Cumulocity: Custom Fields in MongoDB

As of now, there are two custom fields required in MongoDB: Firmware and External ID.

### Installation

1.  Download the Widget source code from the Repository within this project.
2.  Create a Minorbuild binary file from the source code.
      
       Follow the below-specified command to create a Minorbuild binary file

      i) run npm i command to install all library files specified in source code
      ```npm i ``` 

      ii) run npm run buildMinor command to create a binary file under dist folder
     ```npm run buildMinor ``` 

      iii) Copy the binary file **gp-devices-at-risk-widget-0.x.x.tgz** the latest one from the dist folder and Place the binary file under any folder.

3. This could be used in conjunction with the application builder/cockpit.

### Deployment Of Devices at Risk widget In Cockpit Application

##### 1. Install the binary file in cockpit application

To Install the binary file in cockpit application run the following command in cockpit application
```npm i <binary file path> ``` 

Example:
```cmd 
npm i C:\Widgets\c8y-devices-at-risk-widget\gp-devices-at-risk-project\dist\gp-devices-at-risk-widget-0.10.0.tgz
 ``` 
After installation see that your cockpit application has following entry in `package.json `.

```cmd 
"gp-devices-at-risk-widget": "file:../../Widgets/Final/c8y-devices-at-risk-widget/gp-devices-at-risk-project/dist/gp-devices-at-risk-widget-0.10.0.tgz",
 ``` 

##### 2. Import DevicesAtRisk Module

Import GpDevicesAtRiskWidgetModule in app.module.ts and also place the imported Module under `@NgModule`.
```
import { GpDevicesAtRiskWidgetModule } from 'gp-devices-at-risk-widget';
@NgModule({
  imports: [
    GpDevicesAtRiskWidgetModule
      ]
  })
```

##### 3. Add Custom Branding

 - Install the base styles from npm with ```npm install @c8y/style  ``` (please ignore if done as a Prerequisites)
 - Create a LESS file called for instance `branding. less `.
 - Save it inside a new folder, which can have any name you like.
 - In `branding.less ` import following design templates.

```
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
@import '~font-awesome/less/font-awesome.less';
@import '~@c8y/style/main.less';
@import '~@c8y/style/extend.less';
```

- In your application  `package.json ` ->  `c8y` add `brandingEntry`.

`package.json ` ->  `c8y` Snippet
```
"c8y": {
    "application": {
      "name": "custom-cockpit",
      "contextPath": "custom-cockpit",
      "key": "custom-cockpit-application-key",
      "brandingEntry": "./branding/branding.less",
      "tabsHorizontal": true,
      "upgrade": true,
      "rightDrawer": true,
      "sensorAppOneLink": "http://onelink.to/pca6qe",
      "contentSecurityPolicy": "base-uri 'none'; default-src 'self' 'unsafe-inline' http: https: ws: wss:; connect-src 'self' *.billwerk.com http: https: ws: wss:;  script-src 'self' open.mapquestapi.com *.twitter.com *.twimg.com 'unsafe-inline' 'unsafe-eval' data:; style-src * 'unsafe-inline' blob:; img-src * data:; font-src * data:; frame-src *;"
    },
    "cli": {}
  }
```

##### 4. Development server

1. Using `c8ycli`

Run `c8ycli server -u <hhtp://cumulocity_tenant>` for a dev server. Navigate to `http://localhost:9000/apps/<cockpit application name>/`. The app will automatically reload if you change any of the source files.

2. Using `package.json Scripts`
Update package.json start script 

```
"scripts": {
  "start": "c8ycli server  -u <http://cumulocity_tenant>",
  },
```
Run `npm run start ` for a dev server. Navigate to `http://localhost:9000/apps/<cockpit application name>/`. The app will automatically reload if you change any of the source files.


##### 5. Build

1. Using `c8ycli`
Run `c8ycli build` 

2. Using `package.json Scripts`
Update package.json start script 

```
"scripts": {
  "build": "c8ycli build",
  },
```
Run `npm run build ` 

##### 6. Deploy widget to the cockpit

1. Using `c8ycli`
Run `c8ycli deploy -u <http://cumulocity_tenant>` 

2. Using `package.json Scripts`
Update package.json start script 

```
"scripts": {
  "deploy": "c8ycli deploy -u <http://cumulocity_tenant>",
  },
```
Run `npm run deploy ` and provide specific cumulocity tenant URL and basic login credentials.

On successful deployment In cumulocity, you can find your cockpit application under Application switcher.

![](Application_Switcher.PNG)

## Devices at Risk widget as a custom widget for cumulocity-app-builder Application 

  1. Use your existing cumulocity-app-builder application or please refer/clone the cumulocity-app-builder from GitHub [Cumulocity  App Builder](https://github.com/SoftwareAG/cumulocity-app-builder) to create a new application.

  2. Make sure to navigate to ` cd <App builder path>.\cumulocity-app-builder\` folder install all pre-specified Mandatory Library under [Prerequisites](https://labcase.softwareag.com/projects/c8y-devices-at-risk/wiki/Wiki#Prerequisites) in your App Builder.
    So that your application has the following entries in `package.json `.
```
"@angular/cdk": "7.3.7",
"@angular/material": "7.3.7",
"chart.js": "^2.9.3",
"core-js": "^2.6.2",
"ng2-charts": "^2.2.3",
 "@c8y/ngx-components": "^1005.0.3",
  "@c8y/ng1-modules": "^1005.0.3",
"@c8y/style": "^1005.0.3",
 ```
**Note: Even if some of the libraries are available please do install, that will only update the library which is already available with latest changes and also update its dependencies.
**

#####  Cumulocity : Custom Fields in MongoDB

As of now, there are two custom fields required in MongoDB: Firmware and External ID.

### Installation

1.  Download the Widget source code from the Repository within this project.

2.  Create a Minorbuild binary file from the source code.

    - Follow the below-specified command to create a Minorbuild binary file
      i) run npm i command to install all library files specified in source code
      ```npm i ``` 

      ii) run npm run buildMinor command to create a binary file under dist folder
     ```npm run buildMinor ``` 

      iii) Copy the binary file **gp-devices-at-risk-widget-0.X.X.tgz** the latest one from the dist folder and Place the binary file under any folder.

3. This could be used in conjunction with the application builder/cockpit.

### Deployment Of Devices At Risk widget In App Builder

##### 1. Install the binary file in App Builder

To Install the binary file in App Builder, run the following command.

```npm i <binary file path> ``` 

Example:
```cmd 
npm i C:\Widgets\c8y-devices-at-risk-widget\gp-devices-at-risk-project\dist\gp-devices-at-risk-widget-0.10.0.tgz
 ``` 
After installation see that your App Builder  has following entry in `package.json `.

```cmd 
"gp-devices-at-risk-widget": "file:../../Widgets/Final/c8y-devices-at-risk-widget/gp-devices-at-risk-project/dist/gp-devices-at-risk-widget-0.10.0.tgz",
 ``` 

##### 2. Import DevicesAtRisk Module

Import GpDevicesAtRiskWidgetModule in cumulocity-app-builder\custom-widgets\custom-widgets.module.ts  and also place the imported Module under `@NgModule`.
```
import { GpDevicesAtRiskWidgetModule } from 'gp-devices-at-risk-widget';
@NgModule({
  imports: [
    GpDevicesAtRiskWidgetModule
      ]
  })
```
##### 2. Add Custom Branding templates

 - Install the base styles from npm with ```npm install @c8y/style  ``` (please ignore if done as a Prerequisites)
 - In App Builder application navigate to `cumulocity-app-builder\ui-assets\index.less `
 - In `index.less ` import following design templates.

```
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
@import '~font-awesome/less/font-awesome.less';
@import '~@c8y/style/main.less';
@import '~@c8y/style/extend.less';
```


##### 3. Development server


1. Using `package.json Scripts`

run ``` npm i ```

Update package.json start script 

```
"scripts": {
  "start": "c8ycli server --env.extraWebpackConfig=./extra-webpack.config.js  -u <http://cumulocity_tenant>",
  },
```
Run `npm run start ` for a dev server. Navigate to `http://localhost:9000/apps/app-builder/`. The app will automatically reload if you change any of the source files.


##### 4. Build

1. Using `package.json Scripts`
Update package.json start script 

```
"scripts": {
  "build": "c8ycli build --env.extraWebpackConfig=./extra-webpack.config.js",
  },
```
Run `npm run build ` 

##### 5. Deploy widget to the cockpit

1. Using `package.json Scripts`
Update package.json start script 

```
"scripts": {
  "deploy": "c8ycli build --env.extraWebpackConfig=./extra-webpack.config.js -u <http://cumulocity_tenant>",
  },
``` 
Run `npm run deploy ` and provide the cumulocity tenant URL and basic login credentials


On the successful deployment of the widget, login to cumulocity tenant URL and basic login credentials
1. Open the Application Builder from the app switcher (Next to your username in the top right)
2. Click Add application
3. Enter the application details and click Save
4. Select Add dashboard
5. Click Blank Dashboard
6. Enter the dashboard details and click Save
7. Select the dashboard from the navigation
8. Check for your widget and test it out.

## User Guide

Click on Add Widget and select Devices at Risk as a widget. In the configuration, you only need to select the device group of interest.

![](Devices_at_risk_config.PNG)

## Troubleshooting

### Request a feature

Create a new issue in the [Issues](https://labcase.softwareag.com/projects/your-project-identifier/issues) section of this Labcase project and assign it to *Owner Full Name*. Set the tracker to `Requirement` and provide a meaningful title. Shortly describe the feature.

**Note: If there are any issues with respect to any Mandatory library, please remove that from package.json and run ``` npm i  ```and then install a specific library

Some times if the library is not installed properly, we might face some issues, so the above step is to uninstall that library and re-install the same
**
### Known issues

1.  *Write steps on how to fix any known issues/ problems as an ordered list(s)*

## Disclaimer

This accelerator is not an official Software AG product and as such provided as unsupported open-source under the Apache 2.0 distribution license.