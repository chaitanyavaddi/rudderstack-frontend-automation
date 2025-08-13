import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { IOrdersPage } from '@myIteroDotCom/core/Contracts';
import { LocatorTypes as lt} from "utils/Enums"

let webActions: WebActions;

export class OrdersPage implements IOrdersPage {
    readonly page: Page;
    readonly context: BrowserContext;

    readonly tblDeliveredOrders: Locator;
    readonly completedOrdersRows: Locator;
    readonly btnViewRx: Locator;
    readonly btnViewer: Locator;
    readonly btnInvisalignOutcomeSimulator: Locator;
    readonly btnOrthoCAD: Locator;
    readonly rxAppContainer: Locator;
    readonly linkBack: Locator;
    readonly web3dToolIframe: Locator;

    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context })
        webActions = new WebActions(this.page, this.context);

        this.tblDeliveredOrders  = page.locator('#tbl-delivered-orders');
        this.completedOrdersRows = page.locator('tbody tr[id^="deliveredRow_"]');
        this.btnViewRx           = page.locator('button[id^="delivered-btn-view-rx-"]');
        this.btnViewer           = page.locator('button[id^="delivered-btn-viewer-"]');
        this.btnInvisalignOutcomeSimulator = page.locator('button#iosim-btn');
        this.btnOrthoCAD         = page.locator('button#orthocad-btn');
        this.rxAppContainer      = page.locator('.rx-app-container');
        this.linkBack            = page.locator('#link-back');
        this.web3dToolIframe     = page.locator('#web-3d-tool-iframe');
    }

    async clickOrderRowByOrderId(orderId: number): Promise<void> {
        const orderIdStr = orderId.toString();
        const orderRow = this.page.locator(`tr:has(th.col-rx-id:text-is("${orderIdStr}"))`);
        await expect(orderRow).toBeVisible({ timeout: 10000 });
        await webActions.click(orderRow, `Order row with ID ${orderId} ${lt.TBLR}`);
    }

    async clickOrderRowByIndex(index: number = 0): Promise<void> {
        const orderRow = this.completedOrdersRows.nth(index);
        await webActions.click(orderRow, `Order row ${index} ${lt.TBLR}`);
    }

    async clickViewRxButton(): Promise<void> {
        await webActions.click(this.btnViewRx.first(), `View Rx ${lt.BTN}`);
    }

    async clickViewerButton(): Promise<void> {
        await webActions.click(this.btnViewer.first(), `Viewer ${lt.BTN}`);
    }

    async clickInvisalignOutcomeSimulatorButton(): Promise<void> {
        await webActions.click(this.btnInvisalignOutcomeSimulator, `Invisalign Outcome Simulator ${lt.BTN}`);
    }

    async clickOrthoCADButton(): Promise<void> {
        await webActions.click(this.btnOrthoCAD, `OrthoCAD ${lt.BTN}`);
    }

    async clickBackButton(): Promise<void> {
        await webActions.click(this.linkBack, `Back ${lt.BTN}`);
    }
}