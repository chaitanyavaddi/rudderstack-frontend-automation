import { ILoginPage } from "@common/core/Contracts";
import { Page, BrowserContext, Locator } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { LocatorTypes as lt } from "utils/Enums";
import { step } from "@plugins/allureMod";

let webActions: WebActions;

export class LoginPage implements ILoginPage {
    readonly page: Page;
    readonly context: BrowserContext;

    readonly txtEmail: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;
    readonly btnLoginWithGoogle: Locator;
    readonly btnContinueWithSSO: Locator;
    readonly lnkForgotPassword: Locator;
    readonly lnkSignUp: Locator;

    readonly lnkSkip2FA: Locator;
    readonly btnGoToDashboard: Locator;
    readonly btnCloseAITip: Locator

    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context });
        webActions = new WebActions(this.page, this.context);

        this.txtEmail           = page.locator('input[data-testid="Email"]');
        this.txtPassword        = page.locator('input[data-testid="Password"]');
        this.btnLogin           = page.locator('button.ant-btn-primary').filter({ hasText: 'Log in' });
        this.btnLoginWithGoogle = page.locator('button').filter({ hasText: 'Log in with Google' });
        this.btnContinueWithSSO = page.locator('button').filter({ hasText: 'Continue with SSO' });
        this.lnkForgotPassword  = page.locator('a.login_forgotLink__DhrQI');
        this.lnkSignUp          = page.locator('a').filter({ hasText: 'Sign up' });
        
        this.lnkSkip2FA         = page.locator('[href="/addmfalater"]');
        this.btnGoToDashboard   = page.locator('[type="button"]');
        this.btnCloseAITip      = page.locator('[aria-label="Close"]');
    }

    async navigate(url: string): Promise<void> {
        await step("Navigate to login page", async () => {
            await webActions.goto(url);
        });
    }

    async fillTxtEmail(email: string): Promise<void> {
        await step(`Fill email: ${email}`, async () => {
            await webActions.clearAndFill(this.txtEmail, email, `Email ${lt.TXT}`);
        });
    }

    async fillTxtPassword(password: string): Promise<void> {
        await step("Fill password", async () => {
            await webActions.clearAndFill(this.txtPassword, password, `Password ${lt.TXT}`);
        });
    }

    async clickBtnLogin(): Promise<void> {
        await step("Click login button", async () => {
            await webActions.click(this.btnLogin, `Login ${lt.BTN}`);
        });
    }

    async clickBtnLoginWithGoogle(): Promise<void> {
        await step("Click login with Google button", async () => {
            await webActions.click(this.btnLoginWithGoogle, `Login with Google ${lt.BTN}`);
        });
    }

    async clickBtnContinueWithSSO(): Promise<void> {
        await step("Click continue with SSO button", async () => {
            await webActions.click(this.btnContinueWithSSO, `Continue with SSO ${lt.BTN}`);
        });
    }

    async clickLnkForgotPassword(): Promise<void> {
        await step("Click forgot password link", async () => {
            await webActions.click(this.lnkForgotPassword, `Forgot Password ${lt.LNK}`);
        });
    }

    async clickLnkSkip2FA(): Promise<void> {
        await step("Click 2FA - I'll do it later link", async () => {
            await webActions.click(this.lnkSkip2FA, `2FA ${lt.LNK}`);
        });
    }

    async clickBtnGoToDashboard(): Promise<void> {
        await step("Click Goto dashboard button", async () => {
            await webActions.click(this.btnGoToDashboard, `Goto Dashboard ${lt.BTN}`);
        });
    }

    async clickBtnCloseAIToolTip(): Promise<void> {
        await step("Click AI Tooltip close button", async () => {
            await webActions.click(this.btnCloseAITip, `AI Tip ${lt.BTN}`);
        });
    }

    
}