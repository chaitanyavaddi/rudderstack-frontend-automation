# RudderStack Test Automation Framework

TypeScript-based test automation framework for RudderStack using Playwright with Allure reporting.

**Designed & Developed by:** Chaitanya Vaddi

# Video WalkThrough: Setup, Demo & Features 
Click Below image to start watching!

[![Watch the video](https://img.youtube.com/vi/WyAXcU_LpVs/maxresdefault.jpg)](https://www.youtube.com/watch?v=WyAXcU_LpVs "Click to watch on YouTube")

## Quick Start

### Prerequisites
- Node.js 18+
- Java 17+ (for Allure reports)

### One-Command Setup
```bash
npm run setup
```
This installs dependencies, browsers, and Allure CLI.

### Alternative: Docker Setup
```bash
# Build and run with Docker (no local dependencies needed)
docker build -t rudderstack-tests .
docker run --rm rudderstack-tests
```

### Run Tests

```bash
npm run test:dev        # Development environment
npm run test:qa         # QA environment
npm run test:prod       # Production environment
```

## Quality Principles Implementation

### Clear & Modular Structure
```
├── config/
│   └── testConfig.ts              # Environment configuration
├── engine/web/collect/
│   ├── pages/                     # Page Object Model
│   ├── steps/                     # Business logic layer
│   └── states/                    # State management
├── lib/
│   ├── BaseTest.ts               # Test fixtures
│   └── WebActions.ts             # Reusable utilities
├── tests/                        # Test cases
├── .env.dev                      # Development environment
├── .env.qa                       # QA environment
├── .env.production               # Production environment
└── .github/workflows/            # CI/CD automation
```

### Environment & Credentials Management
**Secure credential storage in environment files:**
```bash
# .env.qa
BASE_URL=https://qa.rudderstack.com
USERNAME=qa.user@company.com
PASSWORD=SecurePassword123
API_VERSION=v2
HEADLESS=false
PARALLEL_EXECUTION=true
```
**Multi-environment support:**
QA, DEV, PRODUCTION

### Code Modularity & Reusability
**Page Object Model implementation:**
```typescript
// Modular page objects with inner tab classes
export class DestinationDetailsPage {
  readonly EventsTab: IEventsTab;
  readonly SourcesTab: ISourcesTab;
  
  // Reusable methods across environments
  async navigate(destinationId: string): Promise<void> {
    await webActions.goto(`/destinations/${destinationId}`);
  }
}
```

**Reusable utilities:**
```typescript
// lib/WebActions.ts - Common utilities
export class WebActions {
  async click(locator: Locator, description: string): Promise<void> {
    // Reusable click with retry logic
  }
  
  async waitForElement(locator: Locator): Promise<void> {
    // Reusable wait logic
  }
}
```

**State management for maintainability:**
```typescript
// Persistent state across test steps
export class DestinationDetailsPageState {
  readonly EventsTab: EventsTabState;
  
  // Reusable state methods
  getMetrics(): EventMetrics {
    return this.EventsTab.getMetrics();
  }
}
```

### CI/CD Integration
**GitHub Actions workflow included:**
```yaml
# .github/workflows/tests.yml
name: Test Automation
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment: [qa, production]
    
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
    - uses: actions/setup-java@v4
    - run: npm ci
    - run: npx playwright install --with-deps
    - run: npm run test:${{ matrix.environment }}:smoke
```

**Automatic environment setup with secrets:**
- Environment-specific credential injection
- Multi-browser testing matrix
- Artifact collection and reporting

## Running Tests

### Basic Execution
```bash
# Run all tests
npm run test

# Environment-specific
npm run test:qa:smoke
npm run test:prod:smoke

# Browser-specific
npm run test:chrome
npm run test:firefox
```

### Report Generation
```bash
# View Allure reports
npm run report:allure:qa

# View HTML reports
npm run report:html:qa
```

## Framework Architecture

### Layered Design
1. **Test Layer** - Business scenarios and test cases
2. **Steps Layer** - Workflow orchestration and business logic
3. **Pages Layer** - UI interactions and element definitions
4. **Core Layer** - Utilities, state management, and configuration

### Environment Configuration
Dynamic configuration loading based on `TEST_ENV`:
```typescript
// config/testConfig.ts
export const testConfig: TestConfig = {
  environment: process.env.TEST_ENV || 'qa',
  baseUrl: process.env.BASE_URL!,
  credentials: {
    username: process.env.USERNAME!,
    password: process.env.PASSWORD!,
  },
  // ... other configuration
};
```

### Test Implementation
```typescript
import test from '@lib/BaseTest';
import { testConfig } from '../config/testConfig';

test(`HTTP → Webhook Flow [${testConfig.environment}]`, { 
  tag: '@Smoke' 
}, async ({ 
  loginPageSteps, 
  connectionsPageSteps, 
  destinationDetailsPageSteps 
}) => {
  
  // Environment-aware credentials
  await loginPageSteps.navigate();
  await loginPageSteps.loginToApplication(
    testConfig.credentials.username, 
    testConfig.credentials.password
  );
  
  // Modular workflow steps
  await connectionsPageSteps.loadDataPlaneUrl();
  await connectionsPageSteps.loadSourceCard(undefined, SourceTypes.HTTP, CardStatus.ENABLED);
  
  await connectionsPageSteps.clickDestinationCard(undefined, DestinationTypes.WEBHOOK, CardStatus.ENABLED);
  
  // Reusable component interactions
  await destinationDetailsPageSteps.EventsTab.navigate();
  await destinationDetailsPageSteps.EventsTab.refresh();
  await destinationDetailsPageSteps.EventsTab.validateMetrics(0, 0, '0%');
});
```

## Available Components

**Page Objects:**
- `loginPageSteps` - Authentication workflows
- `connectionsPageSteps` - Connection management
- `destinationDetailsPageSteps` - Destination configuration
  - `EventsTab` - Event monitoring
  - `SourcesTab` - Source management
  - `TransformationTab` - Data transformation

**Utilities:**
- `webActions` - Common web interactions
- `testConfig` - Environment configuration access

## Clean Code Practices

- **No dead code** - All code is actively used
- **Proper naming** - Descriptive method and class names
- **Consistent formatting** - TypeScript/ESLint standards
- **Modular design** - Single responsibility principle
- **Reusable components** - DRY principle implementation

## Troubleshooting

```bash
# Verify setup
java --version
node --version

# Clean installation
npm run clean
npm run setup

# Docker alternative
docker build -t rudderstack-tests .
docker run --rm rudderstack-tests npm run test:qa:smoke

```
