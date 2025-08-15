import { step } from "@plugins/allureMod"
import test from '@lib/BaseTest';
import { SourceTypes, CardStatus, DestinationTypes} from 'utils/Enums'

test(`MIDC Login - WSO2`, { tag: '@Smoke' }, async ({ loginPageSteps, connectionsPageSteps, destinationDetailsPageSteps }) => {
    await loginPageSteps.navigate();
    await loginPageSteps.loginToApplication("damece9431@bizmud.com", "@Iphone5s@Iphone5s");
    await connectionsPageSteps.loadDataPlaneUrl();
    await connectionsPageSteps.loadSourceCard(undefined, SourceTypes.HTTP, CardStatus.ENABLED);
    const currentState = await connectionsPageSteps.getState();
    // API CALL
    await connectionsPageSteps.clickDestinationCard(undefined, DestinationTypes.WEBHOOK, CardStatus.ENABLED);
    await destinationDetailsPageSteps.EventsTab.navigate();
    await destinationDetailsPageSteps.EventsTab.refresh()
    await destinationDetailsPageSteps.EventsTab.validateMetrics( 0, 0, '0%')
});  


