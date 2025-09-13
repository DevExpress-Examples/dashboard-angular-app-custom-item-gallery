<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/438283434/23.2.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1053403)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->
# Dashboard for Angular - Custom Item Gallery

The example contains the source code of the most requested custom items you can use in your Web Dashboard application. Use the custom items from this example as they are, or modify them according to your needs. In this Web Dashboard application, you can add custom items from the **Custom Items** group in the [Toolbox](https://docs.devexpress.com/Dashboard/117442/web-dashboard/ui-elements-and-customization/ui-elements/toolbox):

![toolbox](images/toolbox.png)

This example uses a client-server architecture. The server (backend) project communicates with the client (frontend) application that includes all the necessary styles, scripts and HTML templates. Note that the script version on the client must match the version of libraries on the server.

- The [asp-net-core-server](asp-net-core-server) folder contains the backend project built with ASP.NET Core 6.0.
- The [dashboard-angular-app](dashboard-angular-app) folder contains the client application built with React.

## Files to Review

* [simple-table-item.ts](dashboard-angular-app/src/app/extensions/simple-table-item.ts)
* [polar-chart-item.ts](dashboard-angular-app/src/app/extensions/polar-chart-item.ts)
* [parameter-item.ts](dashboard-angular-app/src/app/extensions/parameter-item.ts)
* [online-map-item.ts](dashboard-angular-app/src/app/extensions/online-map-item.ts)
* [webpage-item.ts](dashboard-angular-app/src/app/extensions/webpage-item.ts)
* [gantt-item.ts](dashboard-angular-app/src/app/extensions/gantt-item.ts)
* [hierarchical-tree-view-item.ts](dashboard-angular-app/src/app/extensions/hierarchical-tree-view-item.ts)
* [funnel-d3-item.ts](dashboard-angular-app/src/app/extensions/funnel-d3-item.ts)
* [app.component.ts](dashboard-angular-app/src/app/app.component.ts)
* [app.component.html](dashboard-angular-app/src/app/app.component.html)

## Quick Start

### Server
Run the following command in the **asp-net-core-server** folder:

```
dotnet run
```

The server starts at `http://localhost:5000` and the client gets data from `http://localhost:5000/api/dashboard`. To debug the server, run the **asp-net-core-server** application in Visual Studio and change the client's `endpoint` property according to the listening port: `https://localhost:44371/api/dashboard`.

See the following section for information on how to install NuGet packages from the DevExpress NuGet feed: [Install DevExpress Controls Using NuGet Packages](https://docs.devexpress.com/GeneralInformation/115912/installation/install-devexpress-controls-using-nuget-packages).

> This server allows CORS requests from _all_ origins with _any_ scheme (http or https). This default configuration is insecure: any website can make cross-origin requests to the app. We recommend that you specify the client application's URL to prohibit other clients from accessing sensitive information stored on the server. Learn more: [Cross-Origin Resource Sharing (CORS)](https://docs.devexpress.com/Dashboard/400709)

### Client
In the **dashboard-react-app** folder, run the following commands:

```
npm install
npm start
```

Open ```http://localhost:4200/``` in your browser to see the Web Dashboard application.

## Country Sales Dashboard

The dashboard displays product sales for the selected category. Use the Country parameter to filter data by country. Select a category on the Polar Chart to show sales by products from this category in the table.

This dashboard contains the following custom items:

### Simple Table

**View Script**: [simple-table-item.ts](dashboard-angular-app/src/app/extensions/simple-table-item.ts)

A custom **Simple Table** item renders data from the measure / dimensions as an HTML table. You can use the Simple Table as a detail item along with the Master-Filtering feature. This custom item supports the following settings that you can configure in the Web Dashboard UI:

![simple-table-item](images/simple-table-item.png)

- **Show Headers** - Specifies whether to show the field headers in the table. The default value is `Auto`.
- **Text Color** - Allows you to change the text color. The default value is `Dark`.

### Funnel D3 Chart Item

**View Script**: [funnel-d3-item.ts](dashboard-angular-app/src/app/extensions/funnel-d3-item.ts)

A custom **Funnel D3 Chart** item renders a funnel chart using the [D3Funnel](https://github.com/jakezatecky/d3-funnel/blob/master/README.md) JS library. This custom item supports the following settings that you can configure in the Web Dashboard UI:

![funnel-d3-item](images/funnel-d3-item.png)

- **Fill Type** - Specifies the funnel chart's solid or gradient fill type.
- **Curved** - Specifies whether the funnel is curved.
- **Dynamic Height** - Specifies whether the height of blocks are proportional to their weight.
- **Pinch Count** - Specifies how many blocks to pinch at the bottom to create a funnel "neck".


### Polar Chart Item

**View Script**: [polar-chart-item.ts](dashboard-angular-app/src/app/extensions/polar-chart-item.ts)

A custom **Polar Chart** item that allows you to use the [dxPolarChart](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxPolarChart/) DevExtreme widget in your dashboards. This item supports the following settings that you can configure in the Web Dashboard UI:

![polar-chart-item](images/polar-chart-item.png)

- **Display Labels** - Specifies whether to show point labels.

### Parameter Item

**View Script**: [parameter-item.ts](dashboard-angular-app/src/app/extensions/parameter-item.ts)

A custom **Parameter** item renders [dashboard parameter dialog](https://docs.devexpress.com/Dashboard/117571) content inside the dashboard layout, and allows you to edit and submit parameter values. This item supports the following settings that you can configure in the Web Dashboard UI:

![parameter-item](images/parameter-item.png)

- **Show Headers** - Specifies whether to show headers in the parameters table.
- **Show Parameter Name** - Specifies whether to show the first column with parameter names.
- **Automatic Updates** - Specifies whether a parameter item is updated automatically. When enabled, this option hides the 'Submit' and 'Reset' buttons.

## Country Info Dashboard

The dashboard displays information from Wikipedia for the selected country.

This dashboard contains the following custom items:

### Online Map

**View Script**: [online-map-item.ts](dashboard-angular-app/src/app/extensions/online-map-item.ts)

A custom **Online Map** item allows you to place callouts on Google or Bing maps using geographical coordinates. The [dxMap](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxMap/) is used as an underlying UI component. This custom item supports the following settings that you can configure in the Web Dashboard UI:

![online-map-item](images/online-map-item.png)

- **Provider** - Specifies whether to show Google or Bing maps.
- **Type** - Specifies the map type. You can choose between `RoadMap`, `Satellite` or `Hybrid`.
- **Display Mode** - Specifies whether to show markers or routes.

### Web Page

**View Script**: [webpage-item.ts](dashboard-angular-app/src/app/extensions/webpage-item.ts)

A custom **Web Page** item displays a single web page or a set of pages. You can use the Web Page as a detail item along with the Master-Filtering feature. The content is rendered inside the Inline Frame element (`<iframe>`). This custom item supports the following setting that you can configure in the Web Dashboard UI:

![web-page-item](images/web-page-item.png)

- **URL** - Specifies a web page URL. You can set a single page as well as a set of pages (e.g., 'https://en.wikipedia.org/wiki/{0}'). If you add a dimension and specify a placeholder, the data source field returns strings that will be inserted in the position of the {0} placeholder. Thus, the Web Page item joins the specified URL with the current dimension value and displays the page located by this address.

## Tasks Dashboard

The dashboard displays tasks. Select the task to display detailed information in the Grid.

This dashboard contains the following custom item:

### Gannt Item

**View Script**: [gantt-item.ts](dashboard-angular-app/src/app/extensions/gantt-item.ts)

A custom **Gannt** item displays the task flow and dependencies between tasks. This item uses [dxGantt](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxGantt/) as an underlying UI component.

![gantt-item](images/gantt-item.png)

## Departments Dashboard

The dashboard displays departmental data. Use the custom Tree View item to filter detailed information in the Grid.

This dashboard contains the following custom item:

### Hierarchical Tree View

**View Script**: [hierarchical-tree-view-item.ts](dashboard-angular-app/src/app/extensions/hierarchical-tree-view-item.ts)

A custom **Tree View** item can display hierarchical data. This item uses [dxTreeView](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTreeView/) as an underlying UI component.

![hierachical-tree-view](images/hierachical-tree-view.png)

## License
These extensions are distributed under the **MIT** license (free and open-source), but can only be used with a commercial DevExpress Dashboard software product. You can [review the license terms](https://www.devexpress.com/Support/EULAs/NetComponents.xml) or [download a free trial version](https://go.devexpress.com/DevExpressDownload_UniversalTrial.aspx) of the Dashboard suite at [DevExpress.com](https://www.devexpress.com).

## Documentation

- [Create a Custom Item](https://docs.devexpress.com/Dashboard/117546/web-dashboard/ui-elements-and-customization/create-a-custom-item)
- [Install DevExpress Controls Using NuGet Packages](https://docs.devexpress.com/GeneralInformation/115912/installation/install-devexpress-controls-using-nuget-packages)

## More Examples

- [Dashboard for ASP.NET Core - Custom Item Gallery](https://github.com/DevExpress-Examples/asp-net-core-dashboard-custom-item-gallery)
- [Dashboard for ASP.NET Core - Custom Item Tutorials](https://github.com/DevExpress-Examples/asp-net-core-dashboard-custom-item-tutorials)
- [Dashboard for React - Custom Item Tutorials](https://github.com/DevExpress-Examples/dashboard-react-app-custom-item-tutorials)
- [Dashboard for React - Custom Item Gallery](https://github.com/DevExpress-Examples/dashboard-react-app-custom-item-gallery)
- [Dashboard for WinForms - Custom Item Extensions](https://github.com/DevExpress-Examples/winforms-dashboard-custom-items-extension)
<!-- feedback -->
## Does this example address your development requirements/objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=dashboard-angular-app-custom-item-gallery&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=dashboard-angular-app-custom-item-gallery&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
