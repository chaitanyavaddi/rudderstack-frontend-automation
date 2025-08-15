import { PlaywrightTestConfig, devices } from "@playwright/test";
import { testConfig } from "./testConfig";
import * as os from "os";
import * as path from "path";
import * as fs from "fs";


const config: PlaywrightTestConfig = {
  //Global Setup to run before all tests
  // testDir: './tests',

  use: {
    trace: 'retain-on-failure',
    actionTimeout: 5000,        // 5 second timeout for actions
    navigationTimeout: 30000,   // 30 second timeout for navigation
  },

  outputDir: './output/test-results',

  globalSetup: `./global-setup`,

  //sets timeout for each test case
  timeout: 120000,

  //number of retries if test case fails
  retries: 0,

  //Reporters
  reporter: [
    [`./plugins/loggerMod.ts`],
    [
      `allure-playwright`,
      {
        detail: true,
        suiteTitle: false,
        outputFolder: "./output/allure-results",
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },
    ],
    [`html`, { outputFolder: "./output/html-report", open: "never" }],
  ],

  projects: [
    {
      name: `Chrome`,
      use: {
        // Configure the browser to use.
        browserName: `chromium`,
        actionTimeout: 20000,        // 20 second timeout for actions
    navigationTimeout: 30000,   // 30 second timeout for navigation

        //Chrome Browser Config
        channel: `chrome`,

        //Browser Mode
        headless: false,

        //Browser height and width
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,

        //Enable File Downloads in Chrome
        acceptDownloads: true,

        //Artifacts
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,

        //Slows down execution by ms
        launchOptions: {
          slowMo: 500,
        },
      },
    },
    {
      name: `Chromium`,
      use: {
        browserName: `chromium`,
        actionTimeout: 5000,        // 5 second timeout for actions
    navigationTimeout: 30000,   // 30 second timeout for navigation
    
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 500,
        },
      },
    },

    {
      name: `Firefox`,
      use: {
        browserName: `firefox`,
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 500,
        },
      },
    },

    {
      name: `Edge`,
      use: {
        browserName: `chromium`,
        channel: `msedge`,
        headless: false,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 500,
        },
      },
    },
    {
      name: `WebKit`,
      use: {
        browserName: `webkit`,
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 500,
        },
      },
    },
    {
      name: `Device`,
      use: {
        ...devices[`Pixel 4a (5G)`],
        browserName: `chromium`,
        channel: `chrome`,
        headless: true,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 500,
        },
      },
    },
    {
      name: `DB`,
    },
    {
      name: `API`,
      use: {
      },
    },
  ],
};

export default config;