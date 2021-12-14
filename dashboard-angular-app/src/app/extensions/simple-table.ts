import * as Model from 'devexpress-dashboard/model';
import { FormItemTemplates } from 'devexpress-dashboard/designer';
import { ICustomItemExtension, CustomItemViewer } from 'devexpress-dashboard/common';
import { ICustomItemMetaData } from 'devexpress-dashboard/model/items/custom-item/meta';

const SIMPLE_TABLE_EXTENSION_NAME = 'CustomItemSimpleTable';

const svgIcon = `<?xml version="1.0" encoding="utf-8"?>
    <svg version="1.1" id="` + SIMPLE_TABLE_EXTENSION_NAME + `" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
    <path class="dx-dashboard-contrast-icon" d="M21,2H3C2.5,2,2,2.5,2,3v18c0,0.5,0.5,1,1,1h18c0.5,0,1-0.5,1-1V3
        C22,2.5,21.5,2,21,2z M14,4v4h-4V4H14z M10,10h4v4h-4V10z M4,4h4v4H4V4z M4,10h4v4H4V10z M4,20v-4h4v4H4z M10,20v-4h4v4H10z M20,20
        h-4v-4h4V20z M20,14h-4v-4h4V14z M20,8h-4V4h4V8z"/>
    </svg>`;

const simpleTableMeta: ICustomItemMetaData = {
    // A collection of custom data bindings that are available in the Web Dashboard UI.
    bindings: [{
        // A unique name of the data binding.
        propertyName: 'customDimensions',
        // A type of the data item(-s).
        dataItemType: 'Dimension',
        // Specifies whether this binding is a collection or a single value.
        array: true,
        // A caption of the data binding.
        displayName: "Custom Dimensions",
        emptyPlaceholder: 'Set Dimensions',
        selectedPlaceholder: "Configure Dimensions"
    }, {
        propertyName: 'customMeasure',
        dataItemType: 'Measure',
        array: false,
        displayName: "Custom Measure",
        emptyPlaceholder: 'Set Measure',
        selectedPlaceholder: "Configure Measure"
    }],
    customProperties: [{
        ownerType: Model.CustomItem,
        propertyName: 'showHeaders',
        valueType: 'string',
        defaultValue: 'Auto',
    }],
    optionsPanelSections: [{
        title: "Custom Options",
        items: [{
            dataField: 'showHeaders',
            template: FormItemTemplates.buttonGroup,
            editorOptions: {
                items: [{ text: 'Auto' }, { text: 'Off' }, { text: 'On' }]
            }
        }]
    }],
    icon: SIMPLE_TABLE_EXTENSION_NAME,
    title: "Simple Table"
};

export class SimpleTableItemExtension implements ICustomItemExtension {
    name = SIMPLE_TABLE_EXTENSION_NAME;
    metaData = simpleTableMeta;

    constructor(dashboardControl: any) {
        dashboardControl.registerIcon(svgIcon);
    }

    public createViewerItem = (model: any, element: any, content: any) => {
        return new SimpleTableItem(model, element, content);
    }
}

export class SimpleTableItem extends CustomItemViewer {
    private table?: HTMLTableElement;

    constructor(model: any, container: any, options: any) {
        super(model, container, options);
    }

    override renderContent(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any) {
        // The changeExisting flag indicates whether to update a custom item content or 
        // render it from scratch when any changes exist (true to update content; otherwise, false).
        if (!changeExisting) {
            while (element.firstChild)
                element.removeChild(element.firstChild);
        
            element.style.overflow = 'auto';
            
            this.table = <HTMLTableElement>(document.createElement('table'));
            
            this.table.setAttribute('cellpadding', '0');
            this.table.setAttribute('cellspacing', '0');
            this.table.setAttribute('border', '1');
            
            element.append(this.table);
        }
        this.update(<string>this.getPropertyValue('showHeaders'));
    }

    update(mode: string) {
        while (this.table?.firstChild)
            this.table?.removeChild(this.table?.firstChild);

        if(mode != 'Off') {
            let bindingValues = this.getBindingValue('customDimensions').concat(this.getBindingValue('customMeasure'));
            this.addTableRow(bindingValues.map(function(item) { return item.displayName(); }), true);
        }

        // Iterates data rows for a custom item. Use the getValue and getDisplayText properties to get a value or a display name of the data row, respectively.
        this.iterateData(rowDataObject => {
            let valueTexts = rowDataObject.getDisplayText('customDimensions').concat(rowDataObject.getDisplayText('customMeasure'));
            this.addTableRow(valueTexts, false);
        });
    }

    addTableRow(texts: string[], isHeader: boolean) {
        let row: HTMLTableRowElement = <HTMLTableRowElement>this.table?.createTHead().insertRow();

        for (let text of texts) {
            let cell = row.insertCell();

            if (isHeader)
                cell.outerHTML = `<th style='padding: 3px;'>${text}</th>`;
            else {
                cell.style.padding = '3px';
                cell.innerText = text;
            }
        }
    }
}