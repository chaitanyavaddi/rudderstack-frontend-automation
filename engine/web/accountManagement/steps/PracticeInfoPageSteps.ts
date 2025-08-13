import { Page, BrowserContext, expect } from '@playwright/test';
import { IPracticeInfoPage, IPracticeInfoPageSteps } from "@accountManagement/core/contracts";
import { PracticeInfoPage } from '@accountManagement/pages/PracticeInfoPage';
import { step } from "@plugins/allureMod"

export class PracticeInfoPageSteps implements IPracticeInfoPageSteps {

    private page: Page
    private context: BrowserContext
    private practiceInfoPage: IPracticeInfoPage;
    
    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context })
        this.practiceInfoPage = new PracticeInfoPage(this.page, this.context);
    }

    async navigate(): Promise<void> {
        await this.page.goto("https://itero-myitero-ppr.iterocloud.com/practice-management/info")
    }

    async verifyPracticeInfo(): Promise<void> {
        await step("MIDC: Verify Practice Information", async () => {
            await this.practiceInfoPage.verifyInfoField()
        });
    }

}
