import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium',
  },

  projects: [
    {
      name: 'Chrome@latest:Windows 11',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            browser: 'chrome',
            os: 'windows',
            os_version: '11',
            name: 'My Playwright Test',
            build: 'build-1',
            'browserstack.username': 'huongtran_fIthzd',
            'browserstack.accessKey': '7Ljq7yLMuksKLVmWLmQC'
          }))}`
        }
      }
    }
  ]
});