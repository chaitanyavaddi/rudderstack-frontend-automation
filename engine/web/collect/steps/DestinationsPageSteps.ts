import { Page, BrowserContext } from '@playwright/test';
import { IDestinationsPageSteps, IDestinationsPage } from "@collect/core/contracts";
import { DestinationsPage } from "@collect/pages/DestinationsPage";
import { step } from "@plugins/allureMod";

export class DestinationsPageSteps implements IDestinationsPageSteps {
    private page: Page;
    private context: BrowserContext;
    private destinationsPage: IDestinationsPage;

    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context });
        this.destinationsPage = new DestinationsPage(this.page, this.context);
    }

    async navigate(): Promise<void> {
        await step("COLLECT: Navigate to Destinations List Page", async () => {
            await this.destinationsPage.navigate();
        });
    }

    async addNewDestination(): Promise<void> {
        await step("COLLECT: Add New Destination", async () => {
            await this.destinationsPage.clickBtnAddDestination();
        });
    }

    async selectDestination(destinationName: string): Promise<void> {
        await step(`COLLECT: Select Destination - ${destinationName}`, async () => {
            await this.destinationsPage.clickDestinationCard(destinationName);
        });
    }
}