import { Page, BrowserContext } from '@playwright/test';
import { ILoginPageSteps, ILoginPage } from "@myIteroDotCom/core/Contracts";
import { LoginPage } from "engine/web/myItero.com/pages/LoginPage"
import { step } from "@plugins/allureMod"

export class LoginPageSteps implements ILoginPageSteps {

    private page: Page
    private context: BrowserContext
    private loginPage: ILoginPage;
    
    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context })
        this.loginPage = new LoginPage(this.page, this.context);
    }

    async navigate(): Promise<void> {
        // await step('MIDC: Navigate: "https://itero-myitero-ppr.iterocloud.com/login"', async () => {
        //     await this.page.goto("https://itero-myitero-ppr.iterocloud.com/login-legacy")
        // });
        await step('MIDC: Navigate', async () => {
            await this.loginPage.navigate('https://itero-myitero-ppr.iterocloud.com/login-legacy')
        });
    }

    async loginToApplication(username, password): Promise<void> {
        await step("MIDC: Login", async () => {
            await this.loginPage.fillTxtUsername(username)
            await this.page.waitForLoadState('load')
            await this.loginPage.fillTxtPassword(password)
            await this.page.waitForLoadState('load')
            await this.loginPage.clickBtnLogin()
            await this.page.waitForLoadState('load')
            await this.loginPage.clickBtnLogin()
            await this.page.waitForLoadState('load')
            await this.loginPage.fillTxtUsername(username)
            await this.page.waitForLoadState('load')
            await this.loginPage.fillTxtPassword(password)
            await this.page.waitForLoadState('load')
            await this.loginPage.clickBtnLogin()
            await this.page.waitForLoadState('load')

            // await this.loginPage
        });
    }

}
