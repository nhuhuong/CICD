import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';

test.describe('Proposaly Workspace & Proposal Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Login before running workspace tests
    await loginPage.navigateToLogin();
    await loginPage.login('automation.adcore@gmail.com', 'Test123@');
  });

  test('TC006: Navigate workspace and create proposal in Automation-Proposal', async ({ page }) => {
    // Arrange
    const workspaceName = 'Automation-Proposal';

    // Act
    // Step 1: Click "Workspace" button
    await dashboardPage.clickWorkspace();

    // Step 2: Verify "Your workspaces" dialog is visible
    const isDialogVisible = await dashboardPage.isWorkspacesDialogVisible();
    expect(isDialogVisible).toBeTruthy();

    // Step 3: On the dialog, Click Search field with "Search workspace" placeholder
    await dashboardPage.clickSearchField();

    // Step 4: Search for workspace "Automation-Proposal"
    await dashboardPage.searchWorkspace(workspaceName);

    // Step 5: Wait for workspace "Automation-Proposal" to appear in results
    await dashboardPage.waitForWorkspaceAppears(workspaceName);

    // Step 6: Select the workspace by clicking on it
    await dashboardPage.selectWorkspace(workspaceName);

    // Step 7: Wait for the workspace appears (page load)
    await dashboardPage.waitForWorkspaceLoad();

    // Step 8: Click Create Proposal button
    await dashboardPage.clickCreateProposal();

    // Assert
    // Step 9: Verify navigation to proposal creation page
    const currentUrl = await dashboardPage.getCurrentUrl();
    expect(currentUrl).toContain('proposal');
  });

  test('TC007: Verify workspace button is visible on dashboard', async () => {
    // Assert
    const isWorkspaceVisible = await dashboardPage.isWorkspaceButtonVisible();
    expect(isWorkspaceVisible).toBeTruthy();
  });

  test('TC008: Verify create proposal button is visible', async () => {
    // Act
    await dashboardPage.clickWorkspace();

    // Assert
    const isCreateProposalVisible = await dashboardPage.isCreateProposalButtonVisible();
    expect(isCreateProposalVisible).toBeTruthy();
  });
});
