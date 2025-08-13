import { Page, Locator, BrowserContext } from '@playwright/test';

export interface ILoginPage {
    readonly txtUsername: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;

    navigate(url): Promise<void>;
    fillTxtUsername(string): Promise<void>;
    fillTxtPassword(string): Promise<void>;
    clickBtnLogin(): Promise<void>;
}

export interface ILoginPageSteps {
    navigate(): Promise<void>;
    loginToApplication(username: string, password:string): Promise<void>;
}

export interface IHomePage{
    readonly btnSettings: Locator;
    readonly mnuPracticeSettings: Locator;
    readonly btnNewScan: Locator;
    readonly btnPatients: Locator;
    readonly btnOrders: Locator;
    readonly btnMessages: Locator;

    clickBtnSettings(): Promise<void>;
    clickMnuPracticeSettings(): Promise<void>;
    clickBtnNewScan(): Promise<void>;
    clickBtnPatients(): Promise<void>;
    clickBtnOrders(): Promise<void>;
    clickBtnMessages(): Promise<void>;
}

export interface IHomePageSteps {
    navigate(): Promise<void>;
    goToPracticeSettings(): Promise<void>;
    goToOrdersPage(): Promise<void>;
    goToNewRxPage(): Promise<void>;
}

export interface IOrdersPage {
    readonly tblDeliveredOrders: Locator;
    readonly completedOrdersRows: Locator;
    readonly btnViewRx: Locator;
    readonly btnViewer: Locator;
    readonly btnInvisalignOutcomeSimulator: Locator;
    readonly btnOrthoCAD: Locator;
    readonly rxAppContainer: Locator;
    readonly linkBack: Locator;
    readonly web3dToolIframe: Locator;

    clickOrderRowByIndex(index: number): Promise<void>;
    clickOrderRowByOrderId(orderId: number): Promise<void>;
    clickViewRxButton(): Promise<void>;
    clickViewerButton(): Promise<void>;
    clickInvisalignOutcomeSimulatorButton(): Promise<void>;
    clickOrthoCADButton(): Promise<void>;
    clickBackButton(): Promise<void>;
}

export interface IOrdersPageSteps {
    navigate(): Promise<void>;
    openRxApp(orderIndex: number): Promise<void>;
    openViewer(orderIndex: number): Promise<void>;
}