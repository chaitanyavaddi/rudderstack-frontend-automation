import { step } from "@plugins/allureMod"
import test from '@lib/BaseTest';

 test(`MIDC Verify - Viwer`, { tag: '@Smoke' }, async ({ doctorPerson, midcLoginPage, midcHomePage, midcOrdersPage }) => {
        await midcLoginPage.navigate()
        await midcLoginPage.loginToApplication(doctorPerson.email, doctorPerson.password)
        await midcHomePage.goToOrdersPage()
        await midcOrdersPage.openViewer(0)
}); 