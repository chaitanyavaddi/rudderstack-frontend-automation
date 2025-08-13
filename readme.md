# Orbit Test Framework

A TypeScript-based test automation framework using Playwright with Allure reporting.

## Prerequisites

### 1. Install Java (Required for Allure Reports)

**Download Java:**
- Visit [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
- Download Java 11 or higher
- Install following the installer instructions

**Set Environment Variables (Windows):**
1. Open System Properties → Advanced → Environment Variables
2. Add new System Variable:
   - Variable name: `JAVA_HOME`
   - Variable value: `C:\Program Files\Java\jdk-17` (your Java path)
3. Edit `Path` variable and add: `%JAVA_HOME%\bin`
4. Restart terminal

**Verify Java Installation:**
```bash
java -version
```

### 2. Install Allure CLI
```bash
npm install -g allure-commandline
```

## Project Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Playwright Browsers
```bash
npx playwright install
```

### 3. Install System Dependencies (Optional)
```bash
npx playwright install-deps
```

## Running Tests

### Environment Options
- `ppr` - Production Preview
- `qas` - QA/Staging  
- `e3` - Environment 3

### Basic Test Execution
```bash

# Run all tests on PPR environment
npm run test --testdata=ppr_readonly_sfa_default_ap.json

```

### Specific Test Commands
```bash
# Run single test file on Chrome
npm run test:single --testdata=ppr_readonly_sfa_default_ap.json

# Run tests with specific tag in parallel
npm run test:parallel --testdata=ppr_readonly_sfa_default_ap.json

# Run tests serially (one at a time)
npm run test:serial --testdata=ppr_readonly_sfa_default_ap.json

# Run tests in UI mode
npm run test:ui --testdata=ppr_readonly_sfa_default_ap.json

# Run API tests
npm run test:api --testdata=ppr_readonly_sfa_default_ap.json

# Run database tests
npm run test:db --testdata=ppr_readonly_sfa_default_ap.json

# Run visual comparison tests
npm run test:visual --testdata=ppr_readonly_sfa_default_ap.json

# Run accessibility tests
npm run test:accessibility --testdata=ppr_readonly_sfa_default_ap.json

# Run tests on mobile device emulation
npm run test:device --testdata=ppr_readonly_sfa_default_ap.json
```

### Debug Options
```bash
# Run with headed browser (visible)
npm run test --testdata=ppr_readonly_sfa_default_ap.json

# Run specific test file
npm run test --testdata=ppr_readonly_sfa_default_ap.json -- tests/yourtest.spec.ts

# Run tests matching a pattern
npm run test --testdata=ppr_readonly_sfa_default_ap.json -- --grep "@Smoke"
```

## Reports

### Generate and View Allure Report
```bash
# After running tests, generate Allure report
# npm run allureReport
allure serve ./output/allure-results
```



### View HTML Report
```bash
# Open built-in HTML report
start ./output/html-report/index.html
```

### Report Locations
- **Allure Results:** `./output/allure-results`
- **HTML Report:** `./output/html-report`
- **Test Results:** `./output/test-results`

## Writing Tests

### Basic Test Structure
```typescript
import { step } from "@plugins/allureMod"
import test from '@lib/BaseTest';

test(`Test Description`, { tag: '@Component' }, async ({ 
  midcLoginPage, 
  midcHomePage, 
  accMngPracticeInfoPage 
}) => {
    // Test steps
    await midcLoginPage.navigate()
    await midcLoginPage.loginToApplication('user@email.com', 'password')
    await midcHomePage.goToPracticeSettings()
    await accMngPracticeInfoPage.verifyPracticeInfo()
});
```

### Available Page Objects
The framework provides pre-configured page objects through fixtures organized by module:

**MyItero.com Module:**
- `midcLoginPage` - Login page interactions
- `midcHomePage` - Home page interactions

**Account Management Module:**  
- `accMngPracticeInfoPage` - Practice info page interactions

**Utilities:**
- `webActions` - Common web actions utility
- `apiActions` - API interaction utilities  
- `dbActions` - Database interaction utilities
- `testDataActions` - Test data management utilities

### Test Tags
Use tags to categorize and run specific test groups:
- `@Smoke` - Smoke tests
- `@Component` - Component tests
- `@API` - API tests
- Custom tags as needed

### Base Test Configuration
The framework extends Playwright's base test with custom fixtures defined in `@lib/BaseTest`:

```typescript
import { TestInfo, test as baseTest } from "@playwright/test";
import { LoginPageSteps as midcLoginPageSteps } from "@myIteroDotCom/steps/LoginPageSteps";
import { HomePageSteps as midcHomePageSteps } from "@myIteroDotCom/steps/HomePageSteps"
import { PracticeInfoPageSteps as accMngPracticeInfoPageSteps } from "@accountManagement/steps/PracticeInfoPageSteps"
import { WebActions } from "@lib/WebActions";

const test = baseTest.extend<{
  webActions: WebActions;
  testInfo: TestInfo;
  midcLoginPage: midcLoginPageSteps;
  midcHomePage: midcHomePageSteps;
  accMngPracticeInfoPage: accMngPracticeInfoPageSteps;
}>({
  // Fixture implementations...
});

export default test;
```

## Adding New Tests

### 1. Creating New Page Objects
Create page objects in the appropriate module:

**For MyItero.com features:**
```typescript
// engine/web/myitero.com/pages/NewPage.ts
export class NewPage {
  constructor(private page: Page, private context: BrowserContext) {}
  
  async performAction() {
    // Page interactions
  }
}
```

**For Account Management features:**
```typescript
// engine/web/accountManagement/pages/NewAccountPage.ts
export class NewAccountPage {
  constructor(private page: Page, private context: BrowserContext) {}
  
  async performAccountAction() {
    // Account-specific interactions
  }
}
```

### 2. Creating Step Definitions
Create corresponding step classes:

```typescript
// engine/web/myitero.com/steps/NewPageSteps.ts
import { NewPage } from "../pages/NewPage";

export class NewPageSteps {
  private newPage: NewPage;
  
  constructor(private page: Page, private context: BrowserContext) {
    this.newPage = new NewPage(page, context);
  }
  
  async executeBusinessWorkflow() {
    await this.newPage.performAction();
    // Additional business logic
  }
}
```

### 3. Extending BaseTest
Add new fixtures to BaseTest:

```typescript
// lib/BaseTest.ts
import { NewPageSteps } from "@myIteroDotCom/steps/NewPageSteps";

const test = baseTest.extend<{
  // ... existing fixtures
  newPage: NewPageSteps;
}>({
  // ... existing fixture implementations
  newPage: async ({ page, context }, use) => {
    await use(new NewPageSteps(page, context));
  },
});
```

### 4. Writing Tests
Use the new fixtures in your tests:

```typescript
// tests/component/newFeature.test.ts
import test from '@lib/BaseTest';

test(`New Feature Test`, { tag: '@Component' }, async ({ 
  midcLoginPage, 
  newPage 
}) => {
    await midcLoginPage.navigate();
    await midcLoginPage.loginToApplication('user@email.com', 'password');
    await newPage.executeBusinessWorkflow();
});
```

## File Organization Guidelines

### Module Structure
- **accountManagement/** - All account/practice management related functionality
- **myitero.com/** - Core application features and main user journeys

### Within Each Module:
- **core/** - Business logic and domain models
- **pages/** - Page object classes with element selectors and basic actions
- **steps/** - Step definition classes with business workflows

### Test Organization:
- **tests/component/** - Feature/component integration tests
- **tests/api/** - API-specific tests
- **tests/utils/** - Test utilities and helpers

### Naming Conventions:
- **Page Objects:** `[FeatureName]Page.ts` (e.g., `LoginPage.ts`)
- **Step Classes:** `[FeatureName]PageSteps.ts` (e.g., `LoginPageSteps.ts`)
- **Test Files:** `[featureName].test.ts` (e.g., `inviteUser.test.ts`)

## Project Structure

```
├── engine/
│   └── web/
│       ├── accountManagement/       # Account management module
│       │   ├── core/               # Core account management logic
│       │   ├── pages/              # Account management page objects
│       │   └── steps/              # Account management step definitions
│       ├── myitero.com/            # Main application module
│       │   ├── core/               # Core application logic  
│       │   ├── pages/              # Application page objects (HomePage.ts, LoginPage.ts)
│       │   └── steps/              # Application step definitions
│       ├── lib/                    # Base utilities and framework
│       │   ├── APIActions.ts       # API interaction utilities
│       │   ├── BaseTest.ts         # Extended Playwright test with fixtures
│       │   ├── DBActions.ts        # Database interaction utilities
│       │   ├── TestDataActions.ts  # Test data management
│       │   └── WebActions.ts       # Web interaction utilities
│       ├── plugins/                # Custom framework plugins
│       │   ├── allureMod.ts        # Allure reporting modifications
│       │   ├── logger.ts           # Logging utilities
│       │   └── loggerMod.ts        # Logger modifications
│       ├── tests/                  # Test files organized by type
│       │   ├── api/                # API tests
│       │   ├── component/          # Component/feature tests
│       │   │   └── inviteUser.test.ts
│       │   └── utils/              # Test utilities
│       ├── output/                 # Test results and reports
│       ├── playwright.config.ts    # Playwright configuration
│       ├── testConfig.ts          # Environment configurations
│       ├── global-setup.ts        # Global test setup
│       └── package.json           # Dependencies and scripts
```

### Architecture Overview

The framework follows a **layered architecture**:

1. **Tests** (`tests/`) - High-level test scenarios
2. **Steps** (`*/steps/`) - Business logic and workflows  
3. **Pages** (`*/pages/`) - Page objects with element definitions
4. **Core** (`*/core/`) - Domain-specific core logic
5. **Lib** (`lib/`) - Shared utilities and base framework
6. **Plugins** (`plugins/`) - Framework extensions

## Troubleshooting

### Common Issues

**Browsers not found:**
```bash
npx playwright install
```

**Java not found (for Allure):**
- Install Java and set JAVA_HOME environment variable
- Add `%JAVA_HOME%\bin` to PATH

**Permission errors:**
```bash
# Run as administrator
npx playwright install --with-deps
```

**Clear Playwright cache:**
```bash
npx playwright install --force
```

### Environment Variables
Make sure these are set in your system:
- `JAVA_HOME` - Path to Java installation
- `PATH` - Should include `%JAVA_HOME%\bin`

### Global Setup
The framework includes `global-setup.ts` for test environment preparation. This runs once before all tests and can be used for:
- Database setup
- Authentication token generation  
- Environment validation
- Test data preparation

### Logging and Reporting
The framework includes custom logging through:
- `plugins/logger.ts` - Core logging functionality
- `plugins/loggerMod.ts` - Playwright integration
- `plugins/allureMod.ts` - Allure report enhancements

Logs are automatically captured and included in test results.

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Allure Report Documentation](https://docs.qameta.io/allure/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)