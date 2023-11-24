// @flow
// import {IProjectSettings} from "./Interfaces";
import { Plugin } from "../Plugin";

import { Component } from 'react';
import * as ReactDOM from "react-dom";
import { DashboardPageContainer } from "./Components/DashboardPageContainer";
import { DashboardProps, DashboardState, IDashboard, IDashboardContent, IProjectSettings } from "../Interfaces";
import { Project, IDataStorage, IItem, IDashboardPage, IDashboardParametersBase } from "matrix-requirements-sdk/client";
import { sdkInstance } from "./../Instance";

export interface IDashboardParameters extends IDashboardParametersBase {}

export class Dashboard extends Component<IDashboardContent, DashboardState> {
    render() {
        return <div className="itemDetails"></div>;
    }
}

// Glue code to support the IDashboardPage interface
// eslint-disable-next-line no-unused-vars
export class DashboardPage implements IDashboardPage<IDashboardParameters> {
    settings: IProjectSettings;

    constructor(
        private project: Project,
        private projectStorage: IDataStorage,
        private popupModeOrControl = false,
        private currentFolder: IItem = undefined,
    ) {
        this.settings = {
            ...Plugin.config.projectSettingsPage.defaultSettings,
            ...project.getItemConfig().getSettingJSON(Plugin.config.projectSettingsPage.settingName, {}),
        };
    }

    /** Add interactive element in this function */
    renderProjectPage() {
        const element = document.createElement("div");
        let dashboard: IDashboard = {
            header: { title: "Dashboard", showFullScreen: false },
            dashboardContent: { settings: this.settings },
        };
        ReactDOM.render(<DashboardPageContainer dashboard={dashboard} />, element);
        sdkInstance.app.itemForm.append(element);
    }

    onResize() {
        /* Will be triggered when resizing. */
    }
}
