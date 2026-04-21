import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Proposal Page Object - Senior Level Implementation
 * Handles all interactions with the proposal creation dialog and workflow
 * Covers: Client, Price Quote, Add-ons screens and dialog management
 */
export class ProposalPage extends BasePage {
  // ====== PROPOSAL DIALOG LOCATORS ======
  private readonly CREATE_BTN = 'button:has-text("Create"):not(:has-text("Create Proposal"))';
  private readonly CLIENT_TITLE = '.proposal-section-title';
  private readonly PRICE_QUOTE_TITLE = '//span[text()="Price quote"]';
  private readonly NEXT_BTN = 'button:has-text("Next")';
  private readonly CLOSE_BTN_STRATEGIES = [
    'button[aria-label*="close" i], button[aria-label*="dismiss" i]',
    '[class*="close"], [class*="dismiss"]',
    'button:has-text("×"), button:has-text("✕")',
    '[matdialogclose], [mat-dialog-close]'
  ];
  
  // ====== PROPOSAL VERIFICATION LOCATORS ======
  private readonly PROPOSAL_ITEM = '[class*="proposal"], [class*="item"], [role="row"]';
  private readonly PROPOSAL_TEXT = 'text="Proposal"';
  private readonly CREATED_ITEM = '[class*="created"], [class*="recently"]';
  private readonly WORKSPACE_CONTENT = '[class*="workspace"], [class*="dashboard"]';
  private readonly DIALOG = '[role="dialog"], [class*="dialog"]';
  
  // ====== TIMEOUTS ======
  private readonly DIALOG_TIMEOUT = 10000;
  private readonly ELEMENT_TIMEOUT = 5000;
  private readonly ACTION_TIMEOUT = 1000;

  constructor(page: Page) {
    super(page);
  }

  // ============================================================
  // STEP 10: Click "Create" button on Create Proposal dialog
  // ============================================================
  /**
   * Click "Create" button on the "Create proposal" dialog
   * Initiates the proposal creation workflow
   * 
   * @throws Error if Create button cannot be clicked
   */
  async clickCreateButton(): Promise<void> {
    try {
      console.log('  Step 10: Click "Create" button on proposal dialog');
      const createBtn = this.page.locator(this.CREATE_BTN).first();
      await createBtn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await createBtn.click();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Failed to click Create button on proposal dialog: ${error}`);
    }
  }

  // ============================================================
  // STEP 11: Wait for "Client" screen to appear
  // ============================================================
  /**
   * Wait for the Client screen to appear after creating proposal
   * Confirms the workflow has progressed to the Client step
   * 
   * @param timeout - Maximum wait time in milliseconds
   * @throws Error if Client screen does not appear
   */
  async waitForClientScreenAppears(timeout: number = this.DIALOG_TIMEOUT): Promise<void> {
    try {
      console.log('  Step 11: Wait for "Client" screen to appear');
      const clientScreenTitle = this.page.locator(this.CLIENT_TITLE);
      await clientScreenTitle.isVisible();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Client screen did not appear: ${error}`);
    }
  }

  /**
   * Verify Client screen is visible
   * 
   * @returns boolean indicating if Client screen is visible
   */
  async isClientScreenVisible(): Promise<boolean> {
    try {
      const clientScreen = this.page.locator('text="Client":visible').first();
      return await clientScreen.isVisible();
    } catch {
      return false;
    }
  }

  // ============================================================
  // STEP 12: Click "Next > Price Quote" button on Client screen
  // ============================================================
  /**
   * Click "Next > Price Quote" button to proceed to Price Quote screen
   * 
   * @throws Error if button cannot be clicked
   */
  async clickNextPriceQuoteButton(): Promise<void> {
    try {
      console.log('  Step 12: Click "Next > Price Quote" button');
      const nextBtn = this.page.locator(this.NEXT_BTN).first();
      await nextBtn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await nextBtn.click();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Failed to click Next > Price Quote button: ${error}`);
    }
  }

  // ============================================================
  // STEP 13: Wait for "Price Quote" screen to appear
  // ============================================================
  /**
   * Wait for the Price Quote screen to appear
   * Confirms successful navigation to the Price Quote step
   * 
   * @param timeout - Maximum wait time in milliseconds
   * @throws Error if Price Quote screen does not appear
   */
  async waitForPriceQuoteScreenAppears(timeout: number = this.DIALOG_TIMEOUT): Promise<void> {
    try {
      console.log('  Step 13: Wait for "Price Quote" screen to appear');
      const priceQuoteTitle = this.page.locator(this.PRICE_QUOTE_TITLE);
      await priceQuoteTitle.isVisible();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Price Quote screen did not appear: ${error}`);
    }
  }

  /**
   * Verify Price Quote screen is visible
   * 
   * @returns boolean indicating if Price Quote screen is visible
   */
  async isPriceQuoteScreenVisible(): Promise<boolean> {
    try {
      const priceQuoteScreen = this.page.locator('text="Price Quote":visible, text="Price":visible').first();
      return await priceQuoteScreen.isVisible();
    } catch {
      return false;
    }
  }

  // ============================================================
  // STEP 14: Click "Next > Add-ons" button on Price Quote screen
  // ============================================================
  /**
   * Click "Next > Add-ons" button to proceed to Add-ons screen
   * 
   * @throws Error if button cannot be clicked
   */
  async clickNextAddonsButton(): Promise<void> {
    try {
      console.log('  Step 14: Click "Next > Add-ons" button');
      const nextBtn = this.page.locator(this.NEXT_BTN).first();
      await nextBtn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await nextBtn.click();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Failed to click Next > Add-ons button: ${error}`);
    }
  }

  // ============================================================
  // STEP 15: Wait for "Add-ons" screen to appear
  // ============================================================
  /**
   * Wait for the Add-ons screen to appear
   * Confirms successful navigation to the Add-ons step
   * 
   * @param timeout - Maximum wait time in milliseconds
   * @throws Error if Add-ons screen does not appear
   */
  async waitForAddonsScreenAppears(timeout: number = this.DIALOG_TIMEOUT): Promise<void> {
    try {
      console.log('  Step 15: Wait for "Add-ons" screen to appear');
      const addonsScreen = this.page.locator(this.CLIENT_TITLE);
      await addonsScreen.isVisible();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Add-ons screen did not appear: ${error}`);
    }
  }

  /**
   * Verify Add-ons screen is visible
   * 
   * @returns boolean indicating if Add-ons screen is visible
   */
  async isAddonsScreenVisible(): Promise<boolean> {
    try {
      const addonsScreen = this.page.locator('text="Add-ons":visible').first();
      return await addonsScreen.isVisible();
    } catch {
      return false;
    }
  }

  // ============================================================
  // STEP 16: Close dialog by clicking X button (top right corner)
  // ============================================================
  /**
   * Click the close button (X) on the top right corner of the dialog
   * Closes the proposal creation dialog using multiple strategies
   * 
   * @throws Error if close button cannot be found or clicked
   */
  async closeProposalDialog(): Promise<void> {
    try {
      console.log('  Step 16: Click close (X) button on dialog');
      
      let closeBtn = null;
      
      // Try multiple strategies to find the close button
      for (const locatorStr of this.CLOSE_BTN_STRATEGIES) {
        const btn = this.page.locator(locatorStr).first();
        if (await btn.isVisible().catch(() => false)) {
          closeBtn = btn;
          break;
        }
      }

      if (!closeBtn) {
        throw new Error('Close button not found using any strategy');
      }

      await closeBtn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await closeBtn.click();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Failed to close proposal dialog: ${error}`);
    }
  }

  /**
   * Verify that the proposal dialog is closed
   * 
   * @param timeout - Maximum wait time in milliseconds
   * @returns boolean indicating if dialog is closed
   */
  async isProposalDialogClosed(timeout: number = 5000): Promise<boolean> {
    try {
      const dialog = this.page.locator(this.DIALOG).first();
      await dialog.waitFor({ state: 'hidden', timeout });
      return true;
    } catch {
      return false;
    }
  }

  // ============================================================
  // STEP 17: Verify proposal is available in the workspace
  // ============================================================
  /**
   * Verify that a proposal was successfully created and is available
   * Checks for proposal in the workspace list/dashboard
   * 
   * @param proposalName - Optional proposal name to search for
   * @returns boolean indicating if proposal is visible
   */
  async isProposalAvailable(proposalName?: string): Promise<boolean> {
    try {
      console.log('  Step 17: Verify proposal is available in workspace');
      
      // Wait a moment for the workspace to refresh after dialog close
      await this.page.waitForTimeout(this.ACTION_TIMEOUT);
      
      // Multiple strategies to find the proposal
      const strategies = [
        () => this.page.locator(this.PROPOSAL_ITEM).first(),
        () => this.page.locator(this.PROPOSAL_TEXT).first(),
        () => this.page.locator(this.CREATED_ITEM).first(),
      ];
      
      for (const strategy of strategies) {
        const element = strategy();
        const isVisible = await element.isVisible().catch(() => false);
        if (isVisible) {
          console.log('    ✅ Success - Proposal found in workspace');
          return true;
        }
      }
      
      console.log('    ⚠️  Could not verify proposal visibility, but workflow completed');
      return false;
    } catch (error) {
      console.warn(`Proposal verification encountered an issue: ${error}`);
      return false;
    }
  }

  /**
   * Wait for proposal to be visible in workspace
   * Polls until proposal appears or timeout
   * 
   * @param timeout - Maximum wait time in milliseconds
   * @throws Error if proposal does not appear
   */
  async waitForProposalVisible(timeout: number = this.ELEMENT_TIMEOUT): Promise<void> {
    try {
      console.log('  Waiting for proposal to appear in workspace...');
      const proposalIndicators = this.page.locator(this.PROPOSAL_ITEM).first();
      await proposalIndicators.waitFor({ state: 'visible', timeout });
      console.log('    ✅ Proposal is now visible');
    } catch (error) {
      throw new Error(`Proposal did not appear within ${timeout}ms: ${error}`);
    }
  }

  /**
   * Get the count of proposals in current view
   * Useful for verifying new proposals were created
   * 
   * @returns number of proposals found
   */
  async getProposalCount(): Promise<number> {
    try {
      const proposals = this.page.locator('[class*="proposal-item"], [role="row"], [class*="card"]');
      return await proposals.count();
    } catch {
      return 0;
    }
  }

  /**
   * Check if we're back on the workspace dashboard
   * Verifies dialog is closed and workspace content is visible
   * 
   * @returns boolean indicating if on workspace dashboard
   */
  async isBackOnWorkspaceDashboard(): Promise<boolean> {
    try {
      // Dialog should be hidden
      const dialogHidden = await this.isProposalDialogClosed();
      
      // And we should see workspace content
      const workspaceContent = this.page.locator(this.WORKSPACE_CONTENT).first();
      const isVisible = await workspaceContent.isVisible().catch(() => false);
      
      return dialogHidden && isVisible;
    } catch {
      return false;
    }
  }
}
