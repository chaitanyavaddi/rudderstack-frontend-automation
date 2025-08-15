import { Page, BrowserContext, expect } from '@playwright/test';
import { ILoginPageSteps, ILoginPage } from "@common/core/Contracts";
import { LoginPage } from "@common/pages/LoginPage";
import { step } from "@plugins/allureMod";
import { WebActions } from '@lib/WebActions';

export class LoginPageSteps implements ILoginPageSteps {

    private page: Page;
    private context: BrowserContext;
    private loginPage: ILoginPage;
    
    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context });
        this.loginPage = new LoginPage(this.page, this.context);
    }

    async navigate(): Promise<void> {
        await step("COMMON: Navigate to Login Page", async () => {
            await this.loginPage.navigate("https://app.rudderstack.com/login");
        });
    }

    async loginToApplication(email: string, password: string): Promise<void> {
        await step(`COMMON: Login to Application - ${email}`, async () => {
            await this.loginPage.fillTxtEmail(email);
            await this.loginPage.fillTxtPassword(password);
            await this.loginPage.clickBtnLogin();
        });
    }

    async verifyLoginButtonEnabled(): Promise<void> {
        await step("COMMON: Verify Login Button is Enabled", async () => {
            await expect(this.loginPage.btnLogin).toBeEnabled();
        });
    }

    async verifyLoginButtonDisabled(): Promise<void> {
        await step("COMMON: Verify Login Button is Disabled", async () => {
            await expect(this.loginPage.btnLogin).toBeDisabled();
        });
    }
}