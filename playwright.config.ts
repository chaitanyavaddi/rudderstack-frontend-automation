import { PlaywrightTestConfig, devices } from "@playwright/test";
import { testConfig } from "./testConfig";
import * as os from "os";
import * as path from "path";
import * as fs from "fs";

const CONFIG_FILE = process.env.npm_config_testdata;

if (!CONFIG_FILE || !CONFIG_FILE.endsWith('.json')) {
  console.log(
    `Please provide a correct config file after command like "--testdata=ppr_readonly_sfa_default_ap.json"`
  );
  process.exit();
}

// Function to search for config file recursively
function findConfigFile(dir: string, filename: string): string | null {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isFile() && item === filename) {
      return fullPath;
    } else if (stat.isDirectory()) {
      const found = findConfigFile(fullPath, filename);
      if (found) return found;
    }
  }
  
  return null;
}

// Search for the config file in config_jsons directory
const configJsonsDir = path.join(process.cwd(), 'config_jsons');
const configPath = findConfigFile(configJsonsDir, CONFIG_FILE);

if (!configPath) {
  console.log(`Configuration file "${CONFIG_FILE}" not found in config_jsons directory or its subdirectories`);
  process.exit();
}

// Extract environment from config filename (e.g., "ppr" from "ppr_readonly_sfa_default_ap.json")
const ENV = CONFIG_FILE.split('_')[0];

if (!ENV || !['ppr', 'qas', 'e3', 'prd'].includes(ENV)) {
  console.log(
    `Config file should start with a valid environment prefix (ppr|qas|e3|prd)`
  );
  process.exit();
}



console.log(`Using config file: ${configPath}`);

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
          config_file: CONFIG_FILE,
          environment: ENV,
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

        //Picks Base Url based on User input
        baseURL: testConfig[ENV],

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
        baseURL: testConfig[ENV],
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
        baseURL: testConfig[ENV],
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
        baseURL: testConfig[ENV],
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
        baseURL: testConfig[ENV],
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
        baseURL: testConfig[ENV],
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
        baseURL: testConfig[ENV],
      },
    },
  ],
};

export default config;