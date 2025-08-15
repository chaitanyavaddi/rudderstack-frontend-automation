// tests/http-webhook-flow.test.ts
import { step } from "@plugins/allureMod";
import test from '@lib/BaseTest';
import { SourceTypes, CardStatus, DestinationTypes } from 'utils/Enums';
import { testConfig } from 'config/testConfig';

test(`RudderStack: HTTP → Webhook Event Flow [${testConfig.environment.toUpperCase()}][API:${testConfig.apiVersion}]`, { 
  tag: '@Smoke' 
}, async ({ 
  loginPageSteps, 
  connectionsPageSteps, 
  destinationDetailsPageSteps 
}) => {
  await loginPageSteps.navigate();
  await loginPageSteps.loginToApplication(
    testConfig.credentials.username, 
    testConfig.credentials.password
  );
  await connectionsPageSteps.loadDataPlaneUrl();
  await connectionsPageSteps.loadSourceCard(undefined, SourceTypes.HTTP, CardStatus.ENABLED);
  const currentState = await connectionsPageSteps.getState();
  // API CALL
  await connectionsPageSteps.clickDestinationCard(undefined, DestinationTypes.WEBHOOK, CardStatus.ENABLED);
  await destinationDetailsPageSteps.EventsTab.navigate();
  await destinationDetailsPageSteps.EventsTab.refresh();
  await destinationDetailsPageSteps.EventsTab.validateMetrics(0, 0, '0%');
});

