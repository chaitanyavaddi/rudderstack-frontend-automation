import { TestInfo, test as baseTest } from "@playwright/test";
import { LoginPageSteps as midcLoginPageSteps } from "@myIteroDotCom/steps/LoginPageSteps";
import { HomePageSteps as midcHomePageSteps } from "@myIteroDotCom/steps/HomePageSteps"
import { OrdersPageSteps as midcOrdersPageSteps } from '@myIteroDotCom/steps/OrdersPageSteps'
import { PracticeInfoPageSteps as accMngPracticeInfoPageSteps } from "@accountManagement/steps/PracticeInfoPageSteps"
import { WebActions } from "@lib/WebActions";
import * as path from "path";
import * as fs from "fs";

// Types for the configuration data
interface Person {
  matPersonId: number;
  email: string;
  password: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  type: string;
  orders: any[];
}

interface Scanner {
  sn: string;
  id: string;
}

interface DocCompany {
  name: string;
  matCompanyId: number;
  region: string;
  country: string;
  flow: string;
  relatedScanners: Scanner[];
  relatedPersons: Person[];
  relatedCompanies: LabCompany[];
  id: string;
  label: string;
}

interface LabCompany {
  name: string;
  matCompanyId: number;
  relatedScanners: Scanner[];
  relatedPersons: Person[];
}

interface Url {
  name: string;
  url: string;
}

interface ConfigData {
  target_region: string;
  urls: Url[];
  preparedData: DocCompany[];
}

const test = baseTest.extend<{
  webActions: WebActions;
  testInfo: TestInfo;

  midcLoginPage: midcLoginPageSteps;
  midcHomePage: midcHomePageSteps;
  midcOrdersPage: midcOrdersPageSteps;
  accMngPracticeInfoPage: accMngPracticeInfoPageSteps;
  
  testConfig: ConfigData;
  docCompany: DocCompany;
  doctorPerson: Person;
  labCompany: LabCompany;
  labPerson: Person;
  environment: string;
  targetRegion: string;
}>({
  webActions: async ({ page, context }, use) => {
    await use(new WebActions(page, context));
  },

  midcLoginPage: async ({ page, context }, use) => {
    await use(new midcLoginPageSteps(page, context));
  },

  midcHomePage: async ({ page, context }, use) => {
    await use(new midcHomePageSteps(page, context));
  },

  midcOrdersPage: async ({page, context}, use) => {
    await use(new midcOrdersPageSteps(page, context));
  },

  accMngPracticeInfoPage: async ({ page, context }, use) => {
    await use(new accMngPracticeInfoPageSteps(page, context));
  },

  // Load the test configuration from JSON file
  testConfig: async ({}, use) => {
    const CONFIG_FILE = process.env.npm_config_testdata;
    
    if (!CONFIG_FILE) {
      throw new Error("Config file not specified. Use --testdata=filename.json");
    }

    // Function to search for config file recursively
    function findConfigFile(dir: string, filename: string): string | null {
      if (!fs.existsSync(dir)) return null;
      
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
      throw new Error(`Configuration file "${CONFIG_FILE}" not found in config_jsons directory or its subdirectories. Searched in: ${configJsonsDir}`);
    }

    console.log(`BaseTest using config file: ${configPath}`);
    const configData: ConfigData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    await use(configData);
  },

  // Extract environment from the URLs section
  environment: async ({ testConfig }, use) => {
    const envUrl = testConfig.urls?.[0];
    if (!envUrl) {
      throw new Error("No environment URL found in config");
    }
    await use(envUrl.name);
  },

  // Extract target region
  targetRegion: async ({ testConfig }, use) => {
    await use(testConfig.target_region);
  },

  // Extract the first doctor company from preparedData
  docCompany: async ({ testConfig }, use) => {
    const docCompany = testConfig.preparedData?.[0];
    
    if (!docCompany) {
      throw new Error("No doctor company found in preparedData");
    }

    await use(docCompany);
  },

  // Extract the first doctor person from the doctor company
  doctorPerson: async ({ docCompany }, use) => {
    const doctorPerson = docCompany.relatedPersons?.[0];

    if (!doctorPerson) {
      throw new Error("No doctor person found in relatedPersons");
    }

    await use(doctorPerson);
  },

  // Extract the first lab company from related companies
  labCompany: async ({ docCompany }, use) => {
    const labCompany = docCompany.relatedCompanies?.[0];

    if (!labCompany) {
      throw new Error("No lab company found in relatedCompanies");
    }

    await use(labCompany);
  },

  // Extract the first lab person from the lab company
  labPerson: async ({ labCompany }, use) => {
    const labPerson = labCompany.relatedPersons?.[0];

    if (!labPerson) {
      throw new Error("No lab person found in lab company relatedPersons");
    }

    await use(labPerson);
  },
});

export default test;