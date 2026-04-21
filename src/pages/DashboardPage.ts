import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Dashboard/Workspace Page Object - Senior Level Implementation
 * Robust, maintainable automation with strategic error handling
 */
export class DashboardPage extends BasePage {
  // ====== LOCATORS ======
  private readonly WORKSPACE_BTN = 'button:has-text("Workspace")';
  private readonly DIALOG_HEADER = 'text="Your workspaces"';
  private readonly SEARCH_INPUT = 'input[placeholder*="Search"]';
  private readonly CREATE_PROPOSAL_BTN = 'button:has-text("Create Proposal")';
  private readonly CREATE_AGREEMENT_BTN = 'button:has-text("Create agreement"), button:has-text("Create Agreement")';
  private readonly CREATE_PRESENTATION_BTN = 'button:has-text("Create presentation"), button:has-text("Create Presentation")';
  private readonly CREATE_PAYMENT_BTN = 'button:has-text("Create payment"), button:has-text("Create Payment")';
  
  // ====== TIMEOUTS ======
  private readonly DIALOG_TIMEOUT = 10000;
  private readonly SEARCH_TIMEOUT = 8000;
  private readonly ELEMENT_TIMEOUT = 5000;

  constructor(page: Page) {
    super(page);
  }

  // ============================================================
  // STEP 1: Click the "Workspace" button
  // ============================================================
  async clickWorkspace(): Promise<void> {
    try {
      const btn = this.page.locator(this.WORKSPACE_BTN).first();
      await btn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await btn.click();
    } catch (error) {
      throw new Error(`Failed to click Workspace button: ${error}`);
    }
  }

  // ============================================================
  // STEP 2: Verify "Your workspaces" dialog is visible
  // ============================================================
  async isWorkspacesDialogVisible(): Promise<boolean> {
    try {
      const dialog = this.page.locator(this.DIALOG_HEADER).first();
      await dialog.waitFor({ state: 'visible', timeout: this.DIALOG_TIMEOUT });
      return true;
    } catch (error) {
      return false;
    }
  }

  async verifyWorkspacesDialog(): Promise<void> {
    const dialog = this.page.locator(this.DIALOG_HEADER).first();
    await dialog.waitFor({ state: 'visible', timeout: this.DIALOG_TIMEOUT });
  }

  // ============================================================
  // STEP 3: Click the search field
  // ============================================================
  async clickSearchField(): Promise<void> {
    try {
      const input = this.page.locator(this.SEARCH_INPUT).first();
      await input.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await input.click();
      await input.focus();
    } catch (error) {
      throw new Error(`Failed to click search field: ${error}`);
    }
  }

  // ============================================================
  // STEP 4: Enter workspace name in search field
  // ============================================================
  async searchWorkspace(workspaceName: string): Promise<void> {
    try {
      const input = this.page.locator(this.SEARCH_INPUT).first();
      await input.clear();
      await input.type(workspaceName, { delay: 50 });
      await this.page.waitForTimeout(800);
    } catch (error) {
      throw new Error(`Failed to search for workspace: ${error}`);
    }
  }

  // ============================================================
  // STEP 5: Wait for workspace to appear in results
  // ============================================================
  async waitForWorkspaceAppears(workspaceName: string): Promise<void> {
    try {
      const result = this.page.locator(`text="${workspaceName}"`).nth(1);
      await result.waitFor({ state: 'visible', timeout: this.SEARCH_TIMEOUT });
    } catch (error) {
      throw new Error(`Workspace did not appear: ${error}`);
    }
  }

  // ============================================================
  // STEP 6: Select workspace from results
  // ============================================================
async selectWorkspace(workspaceName: string): Promise<void> {
  try {
    const workspaceNameLocator = this.page.locator('.board-item', { hasText: workspaceName });

    const count = await workspaceNameLocator.count();
    if (count === 0) {
      throw new Error(`Workspace "${workspaceName}" not found`);
    }

    await workspaceNameLocator.first().click();
  } catch (error) {
    throw new Error(`Failed to select workspace: ${error}`);
  }
}

  // ============================================================
  // STEP 7: Wait for workspace to load
  // ============================================================
  async waitForWorkspaceLoad(): Promise<void> {
    try {
      await this.page.locator(this.CREATE_PROPOSAL_BTN).isVisible()
      //await this.page.waitForLoadState('networkidle', { timeout: this.DIALOG_TIMEOUT });
    } catch {
      await this.page.waitForTimeout(1000);
    }
  }

  // ============================================================
  // STEP 8: Click "Create Proposal" button
  // ============================================================
  async clickCreateProposal(): Promise<void> {
    try {
      const btn = this.page.locator(this.CREATE_PROPOSAL_BTN).first();
      await btn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await btn.click();
    } catch (error) {
      throw new Error(`Failed to click Create Proposal button: ${error}`);
    }
  }

  // ============================================================
  // STEP 8 (Alternative): Click "Create agreement" button
  // ============================================================
  /**
   * Click "Create agreement" button on the workspace dashboard
   * Used for TC007 - Agreement creation workflow
   * 
   * @throws Error if Create agreement button cannot be found or clicked
   */
  async clickCreateAgreement(): Promise<void> {
    try {
      const btn = this.page.locator(this.CREATE_AGREEMENT_BTN).first();
      await btn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await btn.click();
    } catch (error) {
      throw new Error(`Failed to click Create agreement button: ${error}`);
    }
  }

  // ============================================================
  // STEP 8 (Alternative): Click "Create presentation" button
  // ============================================================
  /**
   * Click "Create presentation" button on the workspace dashboard
   * Used for TC008 - Presentation creation workflow
   * 
   * @throws Error if Create presentation button cannot be found or clicked
   */
  async clickCreatePresentation(): Promise<void> {
    try {
      const btn = this.page.locator(this.CREATE_PRESENTATION_BTN).first();
      await btn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await btn.click();
    } catch (error) {
      throw new Error(`Failed to click Create presentation button: ${error}`);
    }
  }

  // ============================================================
  // STEP 8 (Alternative): Click "Create payment" button
  // ============================================================
  /**
   * Click "Create payment" button on the workspace dashboard
   * Used for TC009 - Payment creation workflow
   * 
   * @throws Error if Create payment button cannot be found or clicked
   */
  async clickCreatePayment(): Promise<void> {
    try {
      const btn = this.page.locator(this.CREATE_PAYMENT_BTN).first();
      await btn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await btn.click();
    } catch (error) {
      throw new Error(`Failed to click Create payment button: ${error}`);
    }
  }

  // ============================================================
  // STEP 9: Verify navigation to proposal creation page
  // ============================================================
  async isProposalCreationPageVisible(): Promise<boolean> {
    const url = this.page.url();
    return /proposal|create/i.test(url);
  }

  // ============================================================
  // HELPER METHODS
  // ============================================================

  async isWorkspaceButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.WORKSPACE_BTN).first().isVisible().catch(() => false);
  }

  async isCreateProposalButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.CREATE_PROPOSAL_BTN).first().isVisible().catch(() => false);
  }

  async isCreateAgreementButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.CREATE_AGREEMENT_BTN).first().isVisible().catch(() => false);
  }

  async isCreatePresentationButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.CREATE_PRESENTATION_BTN).first().isVisible().catch(() => false);
  }

  async isCreatePaymentButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.CREATE_PAYMENT_BTN).first().isVisible().catch(() => false);
  }

  async getPageHeading(): Promise<string> {
    const heading = await this.page.locator('h1, h2, [role="heading"]').first().textContent();
    return heading || '';
  }

  // ============================================================
  // CLEANUP METHOD: Return to Welcome / Getting Started workspace
  // ============================================================
  /**
   * Post-test cleanup step
   * Navigates back to "Welcome / Getting Started" workspace
   * Useful for resetting state between tests
   */
  async cleanupReturnToWelcomeWorkspace(): Promise<void> {
    try {
      console.log('\n🧹 Cleanup: Returning to Welcome / Getting Started workspace\n');

      // Step 1: Click Workspace button
      console.log('  Cleanup Step 1: Click "Workspace" button');
      await this.clickWorkspace();
      console.log('    ✅ Success');

      // Step 2: Verify dialog is visible
      console.log('  Cleanup Step 2: Verify "Your workspaces" dialog is visible');
      await this.verifyWorkspacesDialog();
      console.log('    ✅ Success');

      // Step 3: Click search field
      console.log('  Cleanup Step 3: Click search field');
      await this.clickSearchField();
      console.log('    ✅ Success');

      // Step 4: Enter workspace name
      const welcomeWorkspace = 'Welcome / Getting Started';
      console.log(`  Cleanup Step 4: Enter "${welcomeWorkspace}" in search field`);
      await this.searchWorkspace(welcomeWorkspace);
      console.log('    ✅ Success');

      // Step 5: Select workspace
      console.log(`  Cleanup Step 6: Select "${welcomeWorkspace}"`);
      await this.selectWorkspace(welcomeWorkspace);
      console.log('    ✅ Success');

      // Wait for workspace to load
      console.log('  Cleanup Step 6: Wait for workspace to load');
      await this.waitForWorkspaceLoad();
      console.log('    ✅ Success');

      console.log('\n✅ Cleanup completed successfully!\n');
    } catch (error) {
      console.error(`⚠️  Cleanup encountered an issue: ${error}`);
      console.log('  Attempting to continue with next test...\n');
    }
  }
}

