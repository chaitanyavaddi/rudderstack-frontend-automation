     import { step } from "@plugins/allureMod"
    import test from '@lib/BaseTest';

 
 test(`MIDC Verify - RxApp`, { tag: '@Smoke' }, async ({ doctorPerson, midcLoginPage, midcHomePage, midcOrdersPage }) => {
        await midcLoginPage.navigate()
        await midcLoginPage.loginToApplication(doctorPerson.email, doctorPerson.password)
        await midcHomePage.goToOrdersPage()
        await midcOrdersPage.openRxApp(0)
    }); 