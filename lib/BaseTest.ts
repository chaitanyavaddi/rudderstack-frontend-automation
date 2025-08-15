import { TestInfo, test as baseTest } from "@playwright/test";
import { LoginPageSteps  } from "@core/web/common/steps/LoginPageSteps";
import { ConnectionsPageSteps } from "@core/web/collect/steps/ConnectionsPageSteps";
import { DestinationsPageSteps } from "@core/web/collect/steps/DestinationsPageSteps"
import { DestinationDetailsPageSteps } from "@core/web/collect/steps/DestinationDetailsPageSteps"
import { WebActions } from "@lib/WebActions";
import * as path from "path";
import * as fs from "fs";

const test = baseTest.extend<{
  webActions: WebActions;
  testInfo: TestInfo;
  
  loginPageSteps: LoginPageSteps 
  connectionsPageSteps: ConnectionsPageSteps
  destinationsPageSteps: DestinationsPageSteps
  destinationDetailsPageSteps: DestinationDetailsPageSteps
  
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
  }
});

export default test;