# Proposaly Automation Testing Framework

A modern automation testing framework built with **Playwright** and **TypeScript**, implementing the **Page Object Model (POM)** pattern for maintainability and scalability.

## Project Structure

```
proposaly-automation/
├── src/
│   └── pages/
│       ├── BasePage.ts          # Base class with common methods
│       └── LoginPage.ts         # Login page object
├── tests/
│   ├── specs/
│   │   └── login.spec.ts        # Login test cases
│   └── fixtures/
├── playwright.config.ts         # Playwright configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **Page Object Model (POM)**: Encapsulates page interactions for better maintainability
- **TypeScript**: Full type safety and better IDE support
- **Playwright**: Cross-browser testing (Chrome, Firefox, Safari)
- **Multiple Reporters**: HTML, JUnit XML, and JSON reports
- **Screenshots & Videos**: Capture on failure for debugging
- **Parallel Execution**: Run tests concurrently for faster feedback

## Installation

```bash
npm install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests on specific browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Run tests with UI
```bash
npm run test:ui
```

### View test report
```bash
npm run show-report
```

## Test Cases

### Login Tests
- **TC001**: Login with valid credentials (automation.adcore@gmail.com / Test123@)
- **TC002**: Verify login page loads correctly
- **TC003**: Verify email field is visible
- **TC004**: Verify password field is visible
- **TC005**: Verify login button is visible

## Page Object Model Pattern

### BasePage Class
Contains common functionality used across all page objects:
- Navigation
- Input filling
- Element clicking
- Element visibility checks
- URL and title retrieval

### LoginPage Class
Extends BasePage and provides login-specific methods:
- `navigateToLogin()`: Navigate to login page
- `enterUsername()`: Enter username
- `enterPassword()`: Enter password
- `clickLoginButton()`: Click login button
- `login()`: Complete login flow
- `isLoginSuccessful()`: Verify successful login
- `getErrorMessage()`: Get error message if login fails

## Best Practices Implemented

1. **Locator Strategy**: Uses multiple selector strategies to be resilient to UI changes
2. **Wait Strategy**: Implements proper waits for page loads and element visibility
3. **Error Handling**: Gracefully handles missing elements and timeouts
4. **Test Organization**: Clear test names and comments for maintainability
5. **Reports**: Automatic capture of screenshots and videos on failure
6. **Configuration**: Centralized configuration for easy updates

## Configuration Details

- **Base URL**: https://test-app.proposaly.io
- **Screenshot**: Captured on failure only
- **Video**: Retained on failure only
- **Trace**: Recorded on first retry
- **Timeout**: Default 30 seconds (can be customized)

## Environment Variables

You can create a `.env` file for environment-specific values:

```env
BASE_URL=https://test-app.proposaly.io
TEST_USERNAME=automation.adcore@gmail.com
TEST_PASSWORD=Test123@
```

## Extending the Framework

### Adding a New Page Object

1. Create a new file in `src/pages/` (e.g., `DashboardPage.ts`)
2. Extend `BasePage` class
3. Define page locators as properties
4. Implement page-specific methods
5. Use in test specifications

Example:
```typescript
export class DashboardPage extends BasePage {
  readonly WELCOME_TITLE = 'h1:has-text("Welcome")';
  
  async isWelcomeTitleVisible(): Promise<boolean> {
    return await this.isElementVisible(this.WELCOME_TITLE);
  }
}
```

### Adding New Tests

Create a new spec file in `tests/specs/` and follow the AAA pattern (Arrange, Act, Assert).

## Troubleshooting

- **Locators not found**: Update selectors in page objects based on actual element IDs/classes
- **Timeouts**: Increase timeout in `playwright.config.ts` or specific tests
- **Cross-browser issues**: Test on multiple browsers using npm run scripts
- **Network errors**: Check if test app URL is accessible and stable
# proposaly-web-automation
