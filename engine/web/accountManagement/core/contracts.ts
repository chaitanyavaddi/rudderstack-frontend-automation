import { Page, Locator, BrowserContext } from '@playwright/test';

export interface IPracticeInfoPage {

    readonly lblDoctorId: Locator
    readonly lblDoctorIdValue: Locator
    readonly lblDoctorName: Locator
    readonly lblDoctorNameValue: Locator
    readonly lblDoctorEmail: Locator
    readonly lblDoctorEmailValue: Locator
    readonly lblDoctorPhone: Locator
    readonly lblDoctorPhoneValue: Locator

    verifyInfoField(): Promise<void>;
    
}


export interface IPracticeInfoPageSteps {

    navigate(): Promise<void>;
    verifyPracticeInfo(): Promise<void>;
}

