import { Page, BrowserContext, expect } from '@playwright/test';
import { IHomePageSteps, IHomePage } from "@myIteroDotCom/core/Contracts";
import { HomePage } from "engine/web/myItero.com/pages/HomePage"
import { step } from "@plugins/allureMod"

export class HomePageSteps implements IHomePageSteps {

    private page: Page
    private context: BrowserContext
    private homePage: IHomePage;
    
    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context })
        this.homePage = new HomePage(this.page, this.context);
    }

    async navigate(): Promise<void> {
        await step('MIDC: Navigate: "https://itero-myitero-ppr.iterocloud.com/doctors/home"', async () => {
            await this.page.goto("https://itero-myitero-ppr.iterocloud.com/doctors/home")
        });
    }

    //HomePage: Center Card Buttons
    async goToOrdersPage(): Promise<void> {
        await step("MIDC: Goto Orders Page", async () => {
            await this.homePage.clickBtnOrders()
        });
    }

    async goToNewRxPage(): Promise<void> {
        await step("MIDC: Goto New Rx Page", async () => {
            await this.homePage.clickBtnNewScan()
        });
    }

    //HomePage: Settings Area
    async goToPracticeSettings(): Promise<void> {
        await step("MIDC: Goto Practice Settings", async () => {
            await this.homePage.clickBtnSettings()
            await this.homePage.clickMnuPracticeSettings()
        });
    }
}
