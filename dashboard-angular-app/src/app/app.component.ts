import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DxDashboardControlModule } from 'devexpress-dashboard-angular';
import { DevExtremeModule } from 'devextreme-angular';
import { DashboardControlArgs, DashboardPanelExtension } from 'devexpress-dashboard';
import { FunnelD3ItemExtension } from './extensions/funnel-d3-item';
import { GanttItemExtension } from './extensions/gantt-item';
import { TreeViewItemExtension } from './extensions/hierarchical-tree-view-item';
import { OnlineMapItemExtension } from './extensions/online-map-item';
import { ParameterItemExtension } from './extensions/parameter-item';
import { PolarChartItemExtension } from './extensions/polar-chart-item';
import { SimpleTableItemExtension } from './extensions/simple-table-item';
import { WebPageItemExtension } from './extensions/webpage-item';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DxDashboardControlModule, DevExtremeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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
    dashboardControl.registerExtension(new FunnelD3ItemExtension(dashboardControl));
  }
}
