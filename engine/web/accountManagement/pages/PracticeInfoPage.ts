import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { IPracticeInfoPage } from "@accountManagement/core/contracts";
import { LocatorTypes as lt} from "utils/Enums"

let webActions: WebActions;

export class PracticeInfoPage implements IPracticeInfoPage {
    readonly page: Page;
    readonly context: BrowserContext;

    readonly lblDoctorId: Locator;
    readonly lblDoctorIdValue: Locator;
    readonly lblDoctorName: Locator;
    readonly lblDoctorNameValue: Locator;
    readonly lblDoctorEmail: Locator;
    readonly lblDoctorEmailValue: Locator;
    readonly lblDoctorPhone: Locator;
    readonly lblDoctorPhoneValue: Locator;

    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context })
        webActions = new WebActions(this.page, this.context);

        this.lblDoctorId        = page.locator('eup-practice-information-block > div > div:nth-child(1) > div.col-xs-4.item-name > span');
        this.lblDoctorIdValue   = page.locator('eup-practice-information-block > div > div:nth-child(1) > div.col-xs-8.item-value > span');
        this.lblDoctorName      = page.locator('#practiceManagementTab');
        this.lblDoctorNameValue = page.locator('#practiceManagementTab');
        this.lblDoctorEmail     = page.locator('#practiceManagementTab');
        this.lblDoctorEmailValue= page.locator('#practiceManagementTab');
        this.lblDoctorPhone     = page.locator('#practiceManagementTab');
        this.lblDoctorPhoneValue= page.locator('#practiceManagementTab');
    }

    async verifyInfoField(): Promise<void> {
        await webActions.verifyElementToContain(this.lblDoctorId, 'ID:', `ID ${lt.LBL}`)
        await webActions.verifyElementToContain(this.lblDoctorIdValue, '135967', `ID Value ${lt.LBL}`)
    }

}