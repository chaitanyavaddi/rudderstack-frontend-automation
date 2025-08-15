import { Page, BrowserContext, expect } from '@playwright/test';
import { IOrdersPageSteps, IOrdersPage } from "@myIteroDotCom/core/Contracts";
import { OrdersPage } from "engine/web/myItero.com/pages/OrdersPage"
import { step } from "@plugins/allureMod"

export class OrdersPageSteps implements IOrdersPageSteps {

    private page: Page
    private context: BrowserContext
    private ordersPage: IOrdersPage;
    
    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context })
        this.ordersPage = new OrdersPage(this.page, this.context);
    }
    
    navigate(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    async openRxApp(orderIndex: number): Promise<void> {
        await step('MIDC: Open Rx for order ', async () => {
            await this.ordersPage.clickOrderRowByIndex(orderIndex)
            await this.ordersPage.clickViewRxButton()
        });
    }
    async openViewer(orderIndex: number): Promise<void> {
        await step('MIDC: Open Viewer for order ', async () => {
            await this.ordersPage.clickOrderRowByIndex(orderIndex)
            await this.ordersPage.clickViewerButton()
        });
    }
}
