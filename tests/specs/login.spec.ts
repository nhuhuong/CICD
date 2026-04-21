import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { TEST_CONFIG } from '../fixtures/test-utils';
import { DashboardPage } from '../../src/pages/DashboardPage';

test.describe('Proposaly Login Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigateToLogin();
  });

  // ============================================================
  // TC001: Login with valid credentials
  // ============================================================
  // OBJECTIVE: Verify user can successfully authenticate with valid credentials
  //
  // FLOW:
  // 1. Verify login page is loaded
  // 2. Enter valid email and password
  // 3. Click login button
  // 4. Verify successful authentication
  // ============================================================
  test('TC001: Login with valid credentials', async ({ page }) => {
    const testId = 'TC001';
    let currentStep = 0;

    console.log(`\n🔄 ${testId}: Login with valid credentials\n`);

    try {
      currentStep = 1;
      console.log(`  Step ${currentStep}: Navigate to login page`);
      const currentUrl = await loginPage.getCurrentUrl();
      expect(currentUrl).toContain('/login');
      console.log(`    ✅ Successfully on login page: ${currentUrl}\n`);

      currentStep = 2;
      console.log(`  Step ${currentStep}: Enter valid credentials`);
      const { email, password } = TEST_CONFIG.credentials;
      await loginPage.login(email, password);
      
      // Wait for navigation away from login page
      await page.waitForURL((url) => !url.toString().includes('/login'), { timeout: 10000 });

      const dashboardUrl = page.url();
      await expect(dashboardUrl).not.toContain('/login');

      console.log('    ✅ Credentials entered and login submitted\n');

      // ====== TEST COMPLETION ======
      console.log('🎉 TC001 Completed Successfully!\n');
      console.log('📊 Test Summary:');
      console.log('  ✅ Login page verified');
      console.log('  ✅ Valid credentials accepted');
      console.log('  ✅ User successfully authenticated\n');

    } catch (error) {
      console.error(`\n❌ ${testId} Failed at Step ${currentStep}`);
      console.error(`  Error: ${error}\n`);
      throw error;
    }
  });
});
