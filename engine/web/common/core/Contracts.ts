import { Page, Locator, BrowserContext } from '@playwright/test';

export interface ILoginPage {
    readonly txtEmail: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;
    readonly btnLoginWithGoogle: Locator;
    readonly btnContinueWithSSO: Locator;
    readonly lnkForgotPassword: Locator;
    readonly lnkSignUp: Locator;
    
    navigate(url: string): Promise<void>;
    fillTxtEmail(email: string): Promise<void>;
    fillTxtPassword(password: string): Promise<void>;
    clickBtnLogin(): Promise<void>;
    clickBtnLoginWithGoogle(): Promise<void>;
    clickBtnContinueWithSSO(): Promise<void>;
    clickLnkForgotPassword(): Promise<void>;
    clickLnkSignUp(): Promise<void>;

    clickLnkSkip2FA(): Promise<void>;
    clickBtnGoToDashboard(): Promise<void>;
    clickBtnCloseAIToolTip(): Promise<void>
}

export interface ILoginPageSteps {
    navigate(): Promise<void>;
    loginToApplication(email: string, password: string): Promise<void>;
    verifyLoginButtonEnabled(): Promise<void>;
    verifyLoginButtonDisabled(): Promise<void>;
}