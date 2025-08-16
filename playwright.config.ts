// playwright.config.ts
import { PlaywrightTestConfig } from "@playwright/test";
import { testConfig } from "./config/testConfig";

const config: PlaywrightTestConfig = {
  // Global Setup
  globalSetup: './global-setup',

  // Config .env
  timeout: testConfig.timeouts.test,
  retries: testConfig.parallel.retries,
  workers: testConfig.parallel.enabled ? testConfig.parallel.workers : 1,

  // Output Directory from .env
  outputDir: testConfig.reports.testResults,

  // Default Use Options - All controlled by .env
  use: {
    baseURL: testConfig.baseUrl,
    headless: testConfig.browser.headless,
    viewport: testConfig.browser.viewport,
    
    // Timeouts from .env
    actionTimeout: testConfig.timeouts.action,
    navigationTimeout: testConfig.timeouts.navigation,
    
    // Artifacts controlled by .env
    trace: testConfig.artifacts.trace ? 'retain-on-failure' : 'off',
    screenshot: testConfig.artifacts.screenshot ? 'only-on-failure' : 'off',
    video: testConfig.artifacts.video ? 'retain-on-failure' : 'off',
    
    // Standard settings
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
  },

  // Reporters with .env-controlled paths
  reporter: [
    [
      'allure-playwright',
      {
        detail: true,
        suiteTitle: false,
        outputFolder: testConfig.reports.allureOutput,
        environmentInfo: {
          environment: testConfig.environment,
          base_url: testConfig.baseUrl,
          api_version: testConfig.apiVersion,
          parallel_execution: testConfig.parallel.enabled.toString(),
          workers: testConfig.parallel.workers.toString(),
          headless_mode: testConfig.browser.headless.toString(),
        },
      },
    ],
    [
      'html',
      {
        outputFolder: testConfig.reports.htmlOutput,
        open: 'never',
      },
    ],
  ],

  // Projects Configuration
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        headless: true, 
      },
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        headless: true,
      },
    },
    {
      name: 'API',
      use: {
        baseURL: `${testConfig.baseUrl}/api/${testConfig.apiVersion}`,
      },
    },
  ],
};

console.log(`
   Playwright Configuration Loaded from .env:
   Environment: ${testConfig.environment}
   Base URL   : ${testConfig.baseUrl}
   API Version: ${testConfig.apiVersion}
   Username   : ${testConfig.credentials.username}
   Browser    : ${testConfig.browser.headless ? 'Headless' : 'Headed'} (${testConfig.browser.viewport.width}x${testConfig.browser.viewport.height})
   Parallel   : ${testConfig.parallel.enabled} (${testConfig.parallel.workers} workers)
   Retries    : ${testConfig.parallel.retries}
   Artifacts  : Video:${testConfig.artifacts.video} | Screenshot:${testConfig.artifacts.screenshot} | Trace:${testConfig.artifacts.trace}
   Allure     : ${testConfig.reports.allureOutput}
   HTML       : ${testConfig.reports.htmlOutput}
   Timeouts   : Nav:${testConfig.timeouts.navigation}ms | Action:${testConfig.timeouts.action}ms | Test:${testConfig.timeouts.test}ms
`);

export default config;