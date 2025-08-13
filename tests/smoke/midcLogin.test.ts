    import { step } from "@plugins/allureMod"
    import test from '@lib/BaseTest';


    test(`MIDC Login - WSO2`, { tag: '@Smoke' }, async ({ doctorPerson, midcLoginPage  }) => {
        await midcLoginPage.navigate();
        await midcLoginPage.loginToApplication(doctorPerson.email, doctorPerson.password);
    });  


