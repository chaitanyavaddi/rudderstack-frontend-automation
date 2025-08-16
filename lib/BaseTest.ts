import { TestInfo, test as baseTest } from "@playwright/test";
import { LoginPageSteps  } from "@core/web/common/steps/LoginPageSteps";
import { ConnectionsPageSteps } from "@core/web/collect/steps/ConnectionsPageSteps";
import { DestinationsPageSteps } from "@core/web/collect/steps/DestinationsPageSteps"
import { DestinationDetailsPageSteps } from "@core/web/collect/steps/DestinationDetailsPageSteps"
import { WebActions } from "@lib/WebActions";

import { TrackEventApiSteps } from "@core/api/steps/TrackEventApiSteps";
import { IdentifyEventApiSteps } from "@core/api/steps/IdentityEventApiSteps";
import { PageEventApiSteps } from "@core/api/steps/PageEventApiSteps";
import { GroupEventApiSteps } from "@core/api/steps/GroupEventApiSteps";

interface RudderStackApiClient {
  trackEvent: TrackEventApiSteps;
  identify: IdentifyEventApiSteps;
  page: PageEventApiSteps;
  group: GroupEventApiSteps;
}

const test = baseTest.extend<{
  webActions: WebActions;
  testInfo: TestInfo;
  
  loginPageSteps: LoginPageSteps 
  connectionsPageSteps: ConnectionsPageSteps
  destinationsPageSteps: DestinationsPageSteps
  destinationDetailsPageSteps: DestinationDetailsPageSteps

  rudderStackApiClient: (dataPlaneUrl: string, writeKey: string) => RudderStackApiClient
  
}>({
  webActions: async ({ page, context }, use) => {
    await use(new WebActions(page, context));
  },

  loginPageSteps: async ({ page, context }, use) => {
    await use(new LoginPageSteps(page, context));
  },

  connectionsPageSteps: async ({ page, context }, use) => {
    await use(new ConnectionsPageSteps(page, context));
  },

  destinationsPageSteps: async ({ page, context }, use) => {
    await use(new DestinationsPageSteps(page, context));
  },

  destinationDetailsPageSteps: async ({ page, context }, use) => {
    await use(new DestinationDetailsPageSteps(page, context));
  },

  rudderStackApiClient: async ({}, use) => {
    const factory = (dataPlaneUrl: string, writeKey: string): RudderStackApiClient => {
      return {
        trackEvent: new TrackEventApiSteps(dataPlaneUrl, writeKey),
        identify: new IdentifyEventApiSteps(dataPlaneUrl, writeKey),
        page: new PageEventApiSteps(dataPlaneUrl, writeKey),
        group: new GroupEventApiSteps(dataPlaneUrl, writeKey),
      };
    };
    await use(factory);
  }

});

export default test;