import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: 'https://test-app.proposaly.io',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'BrowserStack Chrome',
      use: {
        browserName: 'chromium',
        connectOptions: {
          wsEndpoint: `wss://huongtran_fIthzd:7Ljq7yLMuksKLVmWLmQC@cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            browser: 'chrome',
            browser_version: 'latest',
            os: 'OS X',
            os_version: 'Sonoma',
            name: 'My Playwright Test',
            build: 'build-1',
            'browserstack.debug': true,
            'browserstack.networkLogs': true,
          }))}`
        }
      }
    }
  ],
  webServer: undefined,
});