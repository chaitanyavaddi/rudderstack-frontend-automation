import * as dotenv from 'dotenv';

const environment = process.env.TEST_ENV || 'qa';
dotenv.config({ path: `.env.${environment}` });

export interface TestConfig {
  environment: string;
  baseUrl: string;
  apiVersion: string;
  credentials: {
    username: string;
    password: string;
  };
  timeouts: {
    navigation: number;
    action: number;
    test: number;
  };
  browser: {
    headless: boolean;
    viewport: {
      width: number;
      height: number;
    };
  };
  artifacts: {
    video: boolean;
    screenshot: boolean;
    trace: boolean;
  };
  reports: {
    allureOutput: string;
    htmlOutput: string;
    testResults: string;
  };
  parallel: {
    enabled: boolean;
    workers: number;
    retries: number;
  };
}

export const testConfig: TestConfig = {
  environment,
  baseUrl: process.env.BASE_URL!,
  apiVersion: process.env.API_VERSION!,
  
  credentials: {
    username: process.env.USERNAME!,
    password: process.env.PASSWORD!,
  },
  
  timeouts: {
    navigation: parseInt(process.env.NAVIGATION_TIMEOUT!),
    action: parseInt(process.env.ACTION_TIMEOUT!),
    test: parseInt(process.env.TEST_TIMEOUT!),
  },
  
  browser: {
    headless: process.env.HEADLESS === 'true',
    viewport: {
      width: parseInt(process.env.VIEWPORT_WIDTH!),
      height: parseInt(process.env.VIEWPORT_HEIGHT!),
    },
  },
  
  artifacts: {
    video: process.env.VIDEO_ON_FAILURE === 'true',
    screenshot: process.env.SCREENSHOT_ON_FAILURE === 'true',
    trace: process.env.TRACE_ON_FAILURE === 'true',
  },
  
  reports: {
    allureOutput: process.env.ALLURE_OUTPUT!,
    htmlOutput: process.env.HTML_OUTPUT!,
    testResults: process.env.TEST_RESULTS_OUTPUT!,
  },
  
  parallel: {
    enabled: process.env.PARALLEL_EXECUTION === 'true',
    workers: parseInt(process.env.PARALLEL_WORKERS!),
    retries: parseInt(process.env.TEST_RETRIES!),
  },
};