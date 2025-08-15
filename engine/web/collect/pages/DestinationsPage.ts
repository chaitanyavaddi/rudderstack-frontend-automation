import { IDestinationsPage } from "@collect/core/contracts";
import { Page, BrowserContext, Locator } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { LocatorTypes as lt } from "utils/Enums";
import { step } from "@plugins/allureMod";

let webActions: WebActions;

export class DestinationsPage implements IDestinationsPage {
    readonly page: Page;
    readonly context: BrowserContext;

    // Main destinations list page elements
    readonly btnAddDestination: Locator;
    readonly tblDestinationsList: Locator;
    readonly allDestinationCards: Locator;

    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context });
        webActions = new WebActions(this.page, this.context);

        // Main elements
        this.btnAddDestination   = page.locator('button').filter({ hasText: 'Add destination' });
        this.tblDestinationsList = page.locator('.destinations-table');
        this.allDestinationCards = page.locator('[data-testid*="destination-card"]');
    }

    async navigate(): Promise<void> {
        await step("Navigate to destinations list page", async () => {
            await webActions.goto('/destinations');
        });
    }

    async clickBtnAddDestination(): Promise<void> {
        await step("Click add destination button", async () => {
            await webActions.click(this.btnAddDestination, `Add Destination ${lt.BTN}`);
        });
    }

    async clickDestinationCard(destinationName: string): Promise<void> {
        await step(`Click destination card: ${destinationName}`, async () => {
            const card = this.allDestinationCards.filter({ hasText: destinationName });
            await webActions.click(card, `Destination Card: ${destinationName}`);
        });
    }
}