import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { ILoginPage } from '@myIteroDotCom/core/Contracts';
import { LocatorTypes as lt} from "utils/Enums"

let webActions: WebActions;

export class LoginPage implements ILoginPage {
    readonly page: Page;
    readonly context: BrowserContext;

    readonly txtUsername: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;

    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context })
        webActions       = new WebActions(this.page, this.context);

        this.txtUsername = page.locator('#formLoginDiv > form > div:nth-child(1) > input');
        this.txtPassword = page.locator('#formLoginDiv > form > div:nth-child(2) > input');
        this.btnLogin    = page.locator('#btn-login');
    }

    async navigate(url): Promise<void> {
        await webActions.goto(url)
    }

    async fillTxtUsername(username): Promise<void> {
        await webActions.clearAndFill(this.txtUsername, username, `Username ${lt.TXT}`)
    } //

    async fillTxtPassword(password): Promise<void> {
        await webActions.clearAndFill(this.txtPassword, password, `Password ${lt.TXT}`)
    }

    async clickBtnLogin(): Promise<void> {
        await webActions.click(this.btnLogin, `Login ${lt.BTN}`)
    }

}


