import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Payment Page Object - Senior Level Implementation
 * Handles all interactions with the payment creation dialog and workflow
 * Covers: Payment creation and dialog management
 * 
 * Features:
 * - Robust locator strategies with multiple fallback options
 * - Strategic timeouts configured per operation type
 * - Comprehensive error handling with descriptive messages
 * - Stable waiting mechanisms avoiding hard waits
 */
export class PaymentPage extends BasePage {
  // ====== PAYMENT DIALOG LOCATORS ======
  private readonly CREATE_BTN = 'button:has-text("Create"):not(:has-text("Create Payment"))';
  
  // Close button - Multiple strategies for robustness
  private readonly CLOSE_BTN_STRATEGIES = [
    'button[aria-label*="close" i]',
    'button[aria-label*="dismiss" i]',
    '[class*="close-btn"], [class*="close-button"]',
    'button:has-text("×")',
    'button:has-text("✕")',
    '[matdialogclose]',
    '[mat-dialog-close]',
    'button[class*="close"]'
  ];
  
  // Payment verification locators
  private readonly PAYMENT_ITEM = '[class*="payment"], [class*="item"], [role="row"]';
  private readonly PAYMENT_TEXT = 'text="Payment"';
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
  // STEP 8: Click "Create" button on Create Payment dialog
  // ============================================================
  /**
   * Click "Create" button on the "Create payment" dialog
   * Initiates the payment creation workflow
   * Waits for button visibility before clicking to ensure stability
   * 
   * @throws Error if Create button cannot be found or clicked
   */
  async clickCreateButton(): Promise<void> {
    try {
      console.log('  Step 8: Click "Create" button on payment dialog');
      const createBtn = this.page.locator(this.CREATE_BTN).first();
      await createBtn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await createBtn.click();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Failed to click Create button on payment dialog: ${error}`);
    }
  }

  // ============================================================
  // STEP 9: Close payment dialog using (X) button
  // ============================================================
  /**
   * Close payment dialog by clicking the (X) close button at top-right
   * Uses multiple close button strategies for maximum robustness
   * Each strategy tries to find and click the close button
   * 
   * @throws Error if close button cannot be found or clicked after all strategies
   */
  async closePaymentDialog(): Promise<void> {
    try {
      console.log('  Step 9: Close payment dialog by clicking (X) button');
      
      // Try multiple close button strategies
      for (let i = 0; i < this.CLOSE_BTN_STRATEGIES.length; i++) {
        const strategy = this.CLOSE_BTN_STRATEGIES[i];
        try {
          const closeBtn = this.page.locator(strategy).first();
          const isVisible = await closeBtn.isVisible().catch(() => false);
          if (isVisible) {
            await closeBtn.click();
            console.log('    ✅ Success');
            return;
          }
        } catch {
          // Continue to next strategy if this one fails
        }
      }
      
      // If all strategies fail, throw error
      throw new Error('Could not find close button using any strategy');
    } catch (error) {
      throw new Error(`Failed to close payment dialog: ${error}`);
    }
  }

  // ============================================================
  // STEP 10: Verify dialog is closed
  // ============================================================
  /**
   * Verify that payment dialog is closed
   * Checks that dialog is no longer visible
   * 
   * @returns boolean - true if dialog is closed/not visible, false otherwise
   */
  async isPaymentDialogClosed(): Promise<boolean> {
    try {
      const dialog = this.page.locator(this.DIALOG).first();
      return !(await dialog.isVisible().catch(() => false));
    } catch {
      return true;
    }
  }

  // ============================================================
  // STEP 11: Verify returned to workspace dashboard
  // ============================================================
  /**
   * Verify that we are back on the workspace dashboard
   * Checks for workspace content presence
   * 
   * @returns boolean - true if workspace dashboard is visible, false otherwise
   */
  async isBackOnWorkspaceDashboard(): Promise<boolean> {
    try {
      const workspace = this.page.locator(this.WORKSPACE_CONTENT).first();
      const isVisible = await workspace.isVisible().catch(() => false);
      
      // Additional check: URL should not contain 'create' or 'payment' in lowercase
      const url = this.page.url().toLowerCase();
      const isNotInCreateFlow = !url.includes('create') && !url.includes('payment');
      
      return isVisible && isNotInCreateFlow;
    } catch {
      return false;
    }
  }

  // ============================================================
  // STEP 12: Verify payment is available/visible
  // ============================================================
  /**
   * Verify that the created payment is visible/available
   * Checks for payment items in the workspace list
   * Non-throwing version for conditional checks
   * 
   * @returns boolean - true if payment is found, false otherwise
   */
  async isPaymentAvailable(): Promise<boolean> {
    try {
      // Check for payment item in list
      const paymentItem = this.page.locator(this.PAYMENT_ITEM).filter({ has: this.page.locator(this.PAYMENT_TEXT) }).first();
      const itemVisible = await paymentItem.isVisible().catch(() => false);
      
      if (itemVisible) {
        return true;
      }
      
      // Fallback: Check if any payment text is visible
      const paymentText = this.page.locator(this.PAYMENT_TEXT).first();
      return await paymentText.isVisible().catch(() => false);
    } catch {
      return false;
    }
  }
}
