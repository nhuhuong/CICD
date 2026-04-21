import { Page, expect } from '@playwright/test';

/**
 * Test Configuration & Constants
 * Centralized test data for maintainability
 */
export const TEST_CONFIG = {
  credentials: {
    email: 'automation.adcore@gmail.com',
    password: 'Test123@',
  },
  workspaces: {
    proposal: 'Automation-Proposal',
    agreement: 'Automation-Agreement',
    payment: 'Automation-Payment',
    presentation: 'Automation-Presentation',
    welcome: 'Welcome / Getting Started',
  },
};

/**
 * Navigate to a specific workspace
 * Handles: Click Workspace → Search → Select → Wait for Load
 *
 * @param workspaceName - Name of workspace to navigate to
 * @param page - Playwright page instance
 */
export async function navigateToWorkspace(workspaceName: string, page: Page): Promise<void> {
  // Step 1: Click Workspace button
  await page.locator('button:has-text("Workspace")').first().click();
//   const workspaceBtn = page.locator('button:has-text("Workspace")').first();
//   await workspaceBtn.waitFor({ state: 'visible', timeout: 5000 });
//   await workspaceBtn.click();

  // // Step 2: Verify dialog is visible

  // const dialogVisible = await page.locator('text="Your workspaces"').first().isVisible();
  // expect(dialogVisible).toBe(true);

  // Step 3: Click search field
  const searchInput = page.locator('input[placeholder*="Search"]').first();
  await searchInput.click();
  // await searchInput.waitFor({ state: 'visible', timeout: 5000 });
  // await searchInput.click();
  // await searchInput.focus();
 
  // Step 4: Search workspace
  await searchInput.clear();
  await searchInput.fill(workspaceName);
  // await searchInput.type(workspaceName, { delay: 50 });
  await page.waitForTimeout(800);

  // Step 5: Select workspace
  await page.locator('.board-item', { hasText: workspaceName }).first().click();
//   const workspaceItem = page.locator('.board-item', { hasText: workspaceName }).first();
//   await workspaceItem.waitFor({ state: 'visible', timeout: 8000 });
//   await workspaceItem.click();
}

/**
 * Cleanup function to return to Welcome / Getting Started workspace
 * @param page - Playwright page instance
 */
export async function cleanupToWelcomeWorkspace(page: Page): Promise<void> {
  const currentUrl = page.url();
  const isOnCreationPage = /proposal|agreement|payment|presentation|create/i.test(currentUrl);

  if (!isOnCreationPage) {
    console.log('\n⚠️  Cleanup: Test did not reach creation workflow');
    console.log(`  Current URL: ${currentUrl}`);
    console.log('  Skipping cleanup to preserve error state for debugging.\n');
    return;
  }

  console.log('\n🧹 Cleanup: Returning to Welcome / Getting Started workspace\n');

  try {
    // Step 1: Reload page to close any open dialogs
    console.log('  Cleanup Step 1: Reload page to close dialogs');
    await page.reload();
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    console.log('    ✅ Page reloaded successfully');

    // Step 2: Click Workspace button with robust locator
    console.log('  Cleanup Step 2: Click "Workspace" button');
    const workspaceBtn = page.locator('button:has-text("Workspace")').first();
    await workspaceBtn.waitFor({ state: 'visible', timeout: 5000 });
    await workspaceBtn.click();
    console.log('    ✅ Workspace button clicked');

    // Step 3: Verify "Your workspaces" dialog is visible
    console.log('  Cleanup Step 3: Verify "Your workspaces" dialog is visible');
    const dialogHeader = page.locator('text="Your workspaces"').first();
    await dialogHeader.waitFor({ state: 'visible', timeout: 10000 });
    console.log('    ✅ Workspaces dialog visible');

    // Step 4: Click search field with robust locator
    console.log('  Cleanup Step 4: Click search field');
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    await searchInput.waitFor({ state: 'visible', timeout: 5000 });
    await searchInput.click();
    await searchInput.focus();
    console.log('    ✅ Search field focused');

    // Step 5: Enter workspace name
    const welcomeWorkspace = TEST_CONFIG.workspaces.welcome;
    console.log(`  Cleanup Step 5: Enter "${welcomeWorkspace}" in search field`);
    await searchInput.clear();
    await searchInput.type(welcomeWorkspace, { delay: 50 });
    await page.waitForTimeout(800); // Allow search results to populate
    console.log('    ✅ Workspace name entered');

    // Step 6: Select workspace from results
    console.log(`  Cleanup Step 6: Select "${welcomeWorkspace}"`);
    await page.locator('.board-item', { hasText: welcomeWorkspace }).first().click();
    // const workspaceItem = page.locator('.board-item', { hasText: welcomeWorkspace }).first();
    // await workspaceItem.waitFor({ state: 'visible', timeout: 8000 });
    // await workspaceItem.click();
    console.log('    ✅ Workspace selected');

    // // Step 7: Wait for workspace to load
    // console.log('  Cleanup Step 7: Wait for workspace to load');
    // const welcomePageTitle = page.locator('div.board-title-text', { hasText: welcomeWorkspace });
    // await expect(welcomePageTitle).toBeVisible({ timeout: 15000 });
    // // const createBtn = page.locator('button:has-text("Create")').first();
    // // await createBtn.waitFor({ state: 'visible', timeout: 10000 });
    // console.log('    ✅ Workspace loaded successfully');

    console.log('\n✅ Cleanup completed successfully!\n');

  } catch (error) {
    console.error(`\n❌ Cleanup failed: ${error}`);
    console.log('  This may impact subsequent test runs.\n');
    // Don't throw error to avoid failing the test due to cleanup issues
  }
}