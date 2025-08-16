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
  destinationDetailsPageSteps ,
  rudderStackApiClient
}) => {
  await loginPageSteps.navigate();
  await loginPageSteps.loginToApplication(
    testConfig.credentials.username, 
    testConfig.credentials.password
  );
  await connectionsPageSteps.loadDataPlaneUrl();
  await connectionsPageSteps.loadSourceCard(undefined, SourceTypes.HTTP, CardStatus.ENABLED);
  const connPageState = await connectionsPageSteps.getState();
  console.log(connPageState.dataPlaneUrl);
  console.log(connPageState.currentSourceCard.writeKey);
  const api = rudderStackApiClient(connPageState.dataPlaneUrl, connPageState.currentSourceCard.writeKey);
  await api.trackEvent.sendCurlExampleTrackEvent();
  await connectionsPageSteps.clickDestinationCard(undefined, DestinationTypes.WEBHOOK, CardStatus.ENABLED);
  await destinationDetailsPageSteps.EventsTab.navigate();
  await destinationDetailsPageSteps.EventsTab.refresh();
  await destinationDetailsPageSteps.EventsTab.validateMetrics(0, 0, '0%');
});

