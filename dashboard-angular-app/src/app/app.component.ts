import { Component, ViewEncapsulation } from '@angular/core';
import { DashboardControlArgs, DashboardPanelExtension } from 'devexpress-dashboard';
import { GanttItemExtension } from './extensions/gantt-item';
import { TreeViewItemExtension } from './extensions/hierarchical-tree-view-item';
import { OnlineMapItemExtension } from './extensions/online-map-item';
import { ParameterItemExtension } from './extensions/parameter-item';
import { PolarChartItemExtension } from './extensions/polar-chart-item';
import { SimpleTableItemExtension } from './extensions/simple-table';
import { WebPageItemExtension } from './extensions/webpage-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {

  }

  onBeforeRender(e: DashboardControlArgs) {
    let dashboardControl = e.component;

    dashboardControl.registerExtension(new DashboardPanelExtension(dashboardControl));
    dashboardControl.registerExtension(new WebPageItemExtension(dashboardControl));
    dashboardControl.registerExtension(new SimpleTableItemExtension(dashboardControl));
    dashboardControl.registerExtension(new OnlineMapItemExtension(dashboardControl));
    dashboardControl.registerExtension(new PolarChartItemExtension(dashboardControl));
    dashboardControl.registerExtension(new GanttItemExtension(dashboardControl));
    dashboardControl.registerExtension(new TreeViewItemExtension(dashboardControl));
    dashboardControl.registerExtension(new ParameterItemExtension(dashboardControl));
  }
}