import * as Model from 'devexpress-dashboard/model';
import { ICustomItemExtension, CustomItemViewer } from 'devexpress-dashboard/common';
import { ICustomItemMetaData } from 'devexpress-dashboard/model/items/custom-item/meta';
import { FormItemTemplates } from 'devexpress-dashboard/designer';
import dxButton from 'devextreme/ui/button';

const PARAMETER_EXTENSION_NAME = 'ParameterItem';

const svgIcon = `<?xml version="1.0" encoding="utf-8"?>
    <svg version="1.1" id="` + PARAMETER_EXTENSION_NAME + `" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
    <g class="st0">
        <path class="dx-dashboard-contrast-icon" d="M6,12c0.4,0,0.7,0.1,1,0.2V5c0-0.6-0.4-1-1-1S5,4.4,5,5v7.2
            C5.3,12.1,5.6,12,6,12z M6,18c-0.4,0-0.7-0.1-1-0.2V19c0,0.6,0.4,1,1,1s1-0.4,1-1v-1.2C6.7,17.9,6.4,18,6,18z M12,6
            c0.4,0,0.7,0.1,1,0.2V5c0-0.6-0.4-1-1-1s-1,0.4-1,1v1.2C11.3,6.1,11.6,6,12,6z M12,12c-0.4,0-0.7-0.1-1-0.2V19c0,0.6,0.4,1,1,1
            s1-0.4,1-1v-7.2C12.7,11.9,12.4,12,12,12z M18,17c-0.4,0-0.7-0.1-1-0.2V19c0,0.6,0.4,1,1,1s1-0.4,1-1v-2.2C18.7,16.9,18.4,17,18,17
            z M18,11c0.4,0,0.7,0.1,1,0.2V5c0-0.6-0.4-1-1-1s-1,0.4-1,1v6.2C17.3,11.1,17.6,11,18,11z"/>
    </g>
    <path class="dx-dashboard-accent-icon" d="M6,12c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S7.7,12,6,12z M6,16c-0.6,0-1-0.4-1-1
        s0.4-1,1-1s1,0.4,1,1S6.6,16,6,16z M12,6c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S13.7,6,12,6z M12,10c-0.6,0-1-0.4-1-1s0.4-1,1-1
        s1,0.4,1,1S12.6,10,12,10z M18,11c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S19.7,11,18,11z M18,15c-0.6,0-1-0.4-1-1s0.4-1,1-1
        s1,0.4,1,1S18.6,15,18,15z"/>
    </svg>`;

const onOffButtons = [{ text: 'On' }, { text: 'Off' }];

const buttonsStyle = {
    containerHeight: 60,
    height: 40,
    width: 82,
    marginRight: 15,
    marginTop: 10
};

const parameterItemMeta: ICustomItemMetaData = {
    customProperties: [{
        ownerType: Model.CustomItem,
        propertyName: 'showHeaders',
        valueType: 'string',
        defaultValue: 'On',
    },{
        ownerType: Model.CustomItem,
        propertyName: 'showParameterName',
        valueType: 'string',
        defaultValue: 'On',
    },{
        ownerType: Model.CustomItem,
        propertyName: 'automaticUpdates',
        valueType: 'string',
        defaultValue: 'Off',
    }],
    optionsPanelSections: [{
        title: 'Parameters settings',
        items: [{
            dataField: 'showHeaders',
            template: FormItemTemplates.buttonGroup,
            editorOptions: {
                items: onOffButtons,
            },
        }, {
            dataField: 'showParameterName',
            template: FormItemTemplates.buttonGroup,
            editorOptions: {
                items: onOffButtons,
            },
        }, {
            dataField: 'automaticUpdates',
            template: FormItemTemplates.buttonGroup,
            editorOptions: {
                items: onOffButtons,
            },
        }],
    }],
    icon: PARAMETER_EXTENSION_NAME,
    title: "Parameters"
};

export class ParameterItemExtension implements ICustomItemExtension {
    name = PARAMETER_EXTENSION_NAME;
    metaData = parameterItemMeta;

    constructor(private dashboardControl: any) {
        dashboardControl.registerIcon(svgIcon);
    }

    public createViewerItem = (model: any, element: any, content: any) => {
        var parametersExtension = this.dashboardControl.findExtension("dashboard-parameter-dialog");
        if (!parametersExtension){
            throw Error('The "dashboard-parameter-dialog" extension does not exist. To register this extension, use the DashboardControl.registerExtension method.');
        }
        return new ParameterItem(model, element, content, parametersExtension);
    }
}

export class ParameterItem extends CustomItemViewer {
    gridContainer?: HTMLElement;
    buttonContainer?: HTMLElement;
    parametersExtension: any;
    parametersContent: any;
    dialogButtonSubscribe: any;
    buttons: dxButton[] = [];

    constructor(model: any, container: any, options: any, parametersExtension: any) {
        super(model, container, options);

        this.parametersExtension = parametersExtension;
        this._subscribeProperties();
        this.parametersExtension.showDialogButton(false);
        this.parametersExtension.subscribeToContentChanges(() => {
            this._generateParametersContent();
        });
        this.dialogButtonSubscribe = this.parametersExtension.showDialogButton.subscribe(() => {
            this.parametersExtension.showDialogButton(false);
        });
    }

    override setSize(width: number, height: number): void {
        super.setSize(width, height);
        this._setGridHeight();
    }

    override dispose(): void {
        super.dispose();
        this.parametersContent && this.parametersContent.dispose && this.parametersContent.dispose();
        this.dialogButtonSubscribe.dispose();
        this.parametersExtension.showDialogButton(true);
        this.buttons.forEach(button => button.dispose());
    } 

    override renderContent(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any) {
        if (!changeExisting) {
            element.innerHTML = '';
            this.buttons.forEach(button => button.dispose());
            element.style.overflow = 'auto';
            
            this.gridContainer = document.createElement('div');

            element.appendChild(this.gridContainer);
            this._generateParametersContent();

            this.buttonContainer = document.createElement('div');

            this.buttonContainer.style.height = buttonsStyle.containerHeight + 'px',
            this.buttonContainer.style.width = buttonsStyle.width * 2 + buttonsStyle.marginRight * 2 + 'px',
            this.buttonContainer.style.cssFloat = 'right'
                
            element.appendChild(this.buttonContainer);

            this.buttons.push(this._createButton(this.buttonContainer, "Reset", () => {
                this.parametersContent.resetParameterValues();
            }));
            this.buttons.push(this._createButton(this.buttonContainer, "Submit", () => {
                this._submitValues();
            }));
            if (this.getPropertyValue('automaticUpdates') != 'Off')
                this.buttonContainer.style.display = 'none';
        }
    }
    _generateParametersContent() {
        this.parametersContent = this.parametersExtension.renderContent(this.gridContainer);
        this.parametersContent.valueChanged.add(() => this._updateParameterValues());
        this._setGridHeight();
        this._update({
            showHeaders: this.getPropertyValue('showHeaders'),
            showParameterName: this.getPropertyValue('showParameterName')
        });
    }
    _submitValues() {
        this.parametersContent.submitParameterValues();
        this._update({
            showHeaders: this.getPropertyValue('showHeaders'),
            showParameterName: this.getPropertyValue('showParameterName')
        });
    }
    _updateParameterValues() {
        this.getPropertyValue('automaticUpdates') != 'Off' ? this._submitValues() : null;
    }
    _setGridHeight() {
        var gridHeight = this.contentHeight();
        if (this.getPropertyValue('automaticUpdates') === 'Off')
            gridHeight -= buttonsStyle.containerHeight;
        this.parametersContent.grid.option('height', gridHeight);
    }
    _createButton(container: HTMLElement, buttonText: string, onClick: () => void): dxButton {
        let button =   document.createElement("div");
        button.style.marginRight =  buttonsStyle.marginRight + 'px';
        button.style.marginTop = buttonsStyle.marginTop + 'px';
        container.appendChild(button);
        return new dxButton(button, {
            text: buttonText,
            height: buttonsStyle.height + 'px',
            width: buttonsStyle.width + 'px',
            onClick: onClick
        });
    }
    _subscribeProperties() {
        this.subscribe('showHeaders', (showHeaders) => { this._update({ showHeaders: showHeaders }); });
        this.subscribe('showParameterName', (showParameterName) => { this._update({ showParameterName: showParameterName }); });
        this.subscribe('automaticUpdates', (automaticUpdates) => { this._update({ automaticUpdates: automaticUpdates }) });
    };
    _update(options: any) {
        if (!!options.showHeaders) {
            this.parametersContent.grid.option('showColumnHeaders', options.showHeaders === 'On');
        }
        if(!!options.showParameterName) {
            this.parametersContent.valueChanged.empty();
            this.parametersContent.grid.columnOption(0, 'visible', options.showParameterName === 'On');
            this.parametersContent.valueChanged.add(() => { return this._updateParameterValues(); });
        }
        if(!!options.automaticUpdates) {
            if (this.buttonContainer){
                if (options.automaticUpdates == 'Off') {
                    this.buttonContainer.style.display = 'block';
                } else {
                    this.buttonContainer.style.display = 'none';
                }
            }
        }
        this._setGridHeight();
    }
}