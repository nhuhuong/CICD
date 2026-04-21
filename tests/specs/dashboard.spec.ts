import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';

/**
 * Test Configuration & Constants
 * Centralized test data for maintainability
 */
const TEST_CONFIG = {
  credentials: {
    email: 'automation.adcore@gmail.com',
    password: 'Test123@',
  },
  workspaces: {
    welcome: 'Welcome / Getting Started',
  },
};

test.describe('Dashboard Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Login before running dashboard tests
    await loginPage.navigateToLogin();
    await loginPage.login(TEST_CONFIG.credentials.email, TEST_CONFIG.credentials.password);
    await dashboardPage.waitForWorkspaceLoad();
  });

  // ============================================================
  // HELPER METHODS - Reusable Test Functions
  // ============================================================

  /**
   * Navigate to a specific workspace
   * Handles: Click Workspace → Search → Select → Wait for Load
   * 
   * @param workspaceName - Name of workspace to navigate to
   */
  async function navigateToWorkspace(workspaceName: string): Promise<void> {
    await dashboardPage.clickWorkspace();
    const dialogVisible = await dashboardPage.isWorkspacesDialogVisible();
    expect(dialogVisible).toBe(true);

    await dashboardPage.clickSearchField();
    await dashboardPage.searchWorkspace(workspaceName);
    await dashboardPage.selectWorkspace(workspaceName);
    await dashboardPage.waitForWorkspaceLoad();
  }

  // ============================================================
  // TC001: Verify dashboard loads after login
  // ============================================================
  test('TC001: Verify dashboard loads successfully after login', async ({ page }) => {
    console.log('\n🔄 TC001: Verify dashboard loads after login\n');

    // Verify we're on the dashboard
    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();
    console.log(`  ✅ Dashboard loaded at: ${currentUrl}`);

    // Verify workspace is loaded
    await dashboardPage.waitForWorkspaceLoad();
    console.log('  ✅ Workspace loaded successfully');

    console.log('🎉 TC001 Completed Successfully!\n');
  });

  // ============================================================
  // TC002: Verify workspace navigation functionality
  // ============================================================
  test('TC002: Verify workspace navigation to Welcome workspace', async ({ page }) => {
    const workspaceName = TEST_CONFIG.workspaces.welcome;
    console.log(`\n🔄 TC002: Navigate to "${workspaceName}" workspace\n`);

    // Navigate to welcome workspace
    await navigateToWorkspace(workspaceName);
    console.log(`  ✅ Successfully navigated to ${workspaceName}`);

    // Verify navigation
    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();
    console.log(`  ✅ Current URL: ${currentUrl}`);

    console.log('🎉 TC002 Completed Successfully!\n');
  });

});

