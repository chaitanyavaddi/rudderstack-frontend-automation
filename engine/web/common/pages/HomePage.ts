import { Page, BrowserContext, Locator } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { IHomePage } from '@myIteroDotCom/core/Contracts';
import { LocatorTypes as lt} from "utils/Enums"

let webActions: WebActions;

export class HomePage implements IHomePage {
    readonly page: Page;
    readonly context: BrowserContext;

    readonly btnSettings: Locator;
    readonly mnuPracticeSettings: Locator;
    readonly btnNewScan: Locator;
    readonly btnPatients: Locator;
    readonly btnOrders: Locator;
    readonly btnMessages: Locator;

    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context })
        webActions = new WebActions(this.page, this.context);

        this.btnSettings         = page.locator('div.links-container > ul > li.settings-links');
        this.mnuPracticeSettings = page.locator('#practiceManagementTab');
        this.btnNewScan          = page.locator('#btn-new-scan-doctor');
        this.btnPatients         = page.locator('#btn-patients');
        this.btnOrders           = page.locator('#btn-orders');
        this.btnMessages         = page.locator('#btn-messages');
    }

    async clickBtnSettings(): Promise<void> {
        await webActions.click(this.btnSettings, `Header Settings ${lt.BTN}`)
    }

    async clickMnuPracticeSettings(): Promise<void> {
        await webActions.click(this.mnuPracticeSettings, `Practice Settings ${lt.MNU} item`)
    }

    async clickBtnNewScan(): Promise<void> {
        await webActions.click(this.btnNewScan, `New Scan ${lt.BTN}`);
    }

    async clickBtnPatients(): Promise<void> {
        await webActions.click(this.btnPatients, `Patients ${lt.BTN}`);
    }

    async clickBtnOrders(): Promise<void> {
        await webActions.click(this.btnOrders, `Orders ${lt.BTN}`);
    }

    async clickBtnMessages(): Promise<void> {
        await webActions.click(this.btnMessages, `Messages ${lt.BTN}`);
    }
}