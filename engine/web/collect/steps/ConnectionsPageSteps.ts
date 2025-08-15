import { Page, BrowserContext } from '@playwright/test';
import { IConnectionsPageSteps, IConnectionsPage } from "@collect/core/contracts";
import { ConnectionsPage } from "engine/web/collect/pages/ConnectionsPage";
import { DestinationTypes, SourceTypes } from "utils/Enums";
import { step } from "@plugins/allureMod";
import { ConnectionsPageState } from "@collect/states/ConnectionPageState";

export class ConnectionsPageSteps implements IConnectionsPageSteps {

    private page: Page;
    private context: BrowserContext;
    private connectionsPage: IConnectionsPage;
    
    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context });
        this.connectionsPage = new ConnectionsPage(this.page, this.context);
    }

    getState(): ConnectionsPageState {
        return this.connectionsPage.state;
    }

    async navigate(url: string): Promise<void> {
        await step(`COLLECT: Navigate to Connections Page: "${url}"`, async () => {
            await this.connectionsPage.navigate(url);
        });
    }

    async loadDataPlaneUrl(): Promise<void> {
        await step("COLLECT: Load Data Plane URL", async () => {
            await this.connectionsPage.stateLoadDataPlaneUrl();
        });
    }

    async loadSourceCard(name?: string, type?: SourceTypes | string, status?: string, index?: number): Promise<void> {
        await step(`COLLECT: Load Source Card - Name: ${name || 'Any'}, Type: ${type || 'Any'}, Status: ${status || 'Any'}`, async () => {
            await this.connectionsPage.stateLoadSourceCard(name, type, status, index);
        });
    }

    async loadDestinationCard(name?: string, type?: DestinationTypes | string, status?: string, index?: number): Promise<void> {
        await step(`COLLECT: Load Destination Card - Name: ${name || 'Any'}, Type: ${type || 'Any'}, Status: ${status || 'Any'}`, async () => {
            await this.connectionsPage.stateLoadDestinationCard(name, type, status, index);
        });
    }

    async clickSourceCard(name?: string, type?: SourceTypes | string, status?: string, index?: number): Promise<void> {
        await step(`COLLECT: Click Source Card - Name: ${name || 'Any'}, Type: ${type || 'Any'}, Status: ${status || 'Any'}`, async () => {
            await this.connectionsPage.clickSourceCard(name, type, status, index);
        });
    }

    async clickDestinationCard(name?: string, type?: DestinationTypes | string, status?: string, index?: number): Promise<void> {
        await step(`COLLECT: Click Destination Card - Name: ${name || 'Any'}, Type: ${type || 'Any'}, Status: ${status || 'Any'}`, async () => {
            await this.connectionsPage.clickDestinationCard(name, type, status, index);
        });
    }

    async loadAndClickSourceCard(name?: string, type?: SourceTypes | string, status?: string, index?: number): Promise<void> {
        await step(`COLLECT: Load and Click Source Card - Name: ${name || 'Any'}`, async () => {
            await this.connectionsPage.stateLoadSourceCard(name, type, status, index);
            await this.connectionsPage.clickSourceCard(name, type, status, index);
        });
    }

    async loadAndClickDestinationCard(name?: string, type?: DestinationTypes | string, status?: string, index?: number): Promise<void> {
        await step(`COLLECT: Load and Click Destination Card - Name: ${name || 'Any'}`, async () => {
            await this.connectionsPage.stateLoadDestinationCard(name, type, status, index);
            await this.connectionsPage.clickDestinationCard(name, type, status, index);
        });
    }

    async verifySourceCard(): Promise<void> {
        throw new Error("Not implemented");
    }

    async verifyDestinationCard(): Promise<void> {
        throw new Error("Not implemented");
    }
}