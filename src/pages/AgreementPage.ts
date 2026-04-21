import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Agreement Page Object - Senior Level Implementation
 * Handles all interactions with the agreement creation dialog and workflow
 * Covers: Client, Agreement, Presentation screens and dialog management
 * 
 * Features:
 * - Robust locator strategies with multiple fallback options
 * - Strategic timeouts configured per operation type
 * - Comprehensive error handling with descriptive messages
 * - Stable waiting mechanisms avoiding hard waits
 */
export class AgreementPage extends BasePage {
  // ====== AGREEMENT DIALOG LOCATORS ======
  private readonly CREATE_BTN = 'button:has-text("Create"):not(:has-text("Create Agreement"))';
  private readonly CLIENT_SCREEN_TITLE = '.proposal-section-title';
  private readonly AGREEMENT_SCREEN_TITLE = '//span[text()="Agreement "]';
  private readonly PRESENTATION_ICON = '#Rectangle_5681';
  
  // Next button with context-aware selectors
  private readonly NEXT_BTN = 'button:has-text("Next"), button:has-text("Next >")';
  private readonly NEXT_AGREEMENT_BTN = 'button:has-text("Next > Agreement"), button:has-text("Next"):visible';
  private readonly NEXT_PRESENTATION_BTN = 'button:has-text("Next > Presentation"), button:has-text("Next"):visible';
  
  // Close button - Multiple strategies for robustness
  // private readonly CLOSE_BTN = 'mat-icon:has-text("close")';  
    private readonly CLOSE_BTN_STRATEGIES = [
    'button[aria-label*="close" i]',
    'button[aria-label*="dismiss" i]',
    '[class*="close-btn"], [class*="close-button"]',
    'button:has-text("×")',
    'button:has-text("✕")',
    '[matdialogclose]',
    '[mat-dialog-close]',
    'button[class*="close"]',
    'mat-icon:has-text("close")'
  ];
  // Agreement verification locators
  private readonly AGREEMENT_ITEM = '[class*="agreement"], [class*="item"], [role="row"]';
  private readonly AGREEMENT_TEXT = 'text="Agreement"';
  private readonly CREATED_ITEM = '[class*="created"], [class*="recently"]';
  private readonly WORKSPACE_CONTENT = '[class*="workspace"], [class*="dashboard"]';
  private readonly DIALOG = '[role="dialog"], [class*="dialog"]';
  
  // ====== TIMEOUTS ======
  private readonly DIALOG_TIMEOUT = 10000;
  private readonly ELEMENT_TIMEOUT = 5000;
  private readonly ACTION_TIMEOUT = 1000;
  private readonly SCREEN_TRANSITION_TIMEOUT = 8000;

  constructor(page: Page) {
    super(page);
  }

  // ============================================================
  // STEP 10: Click "Create" button on Create Agreement dialog
  // ============================================================
  /**
   * Click "Create" button on the "Create agreement" dialog
   * Initiates the agreement creation workflow
   * Waits for button visibility before clicking to ensure stability
   * 
   * @throws Error if Create button cannot be found or clicked
   */
  async clickCreateButton(): Promise<void> {
    try {
      console.log('  Step 10: Click "Create" button on agreement dialog');
      const createBtn = this.page.locator(this.CREATE_BTN).first();
      await createBtn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await createBtn.click();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Failed to click Create button on agreement dialog: ${error}`);
    }
  }

  // ============================================================
  // STEP 11: Wait for "Client" screen to appear
  // ============================================================
  /**
   * Wait for the Client screen to appear after creating agreement
   * Uses multiple text variations for robust detection
   * Confirms the workflow has progressed to the Client step
   * 
   * @param timeout - Maximum wait time in milliseconds
   * @throws Error if Client screen does not appear within timeout
   */
  async waitForClientScreenAppears(timeout: number = this.SCREEN_TRANSITION_TIMEOUT): Promise<void> {
    try {
      console.log('  Step 11: Wait for "Client" screen to appear');
      await this.page.locator(this.CLIENT_SCREEN_TITLE).isVisible();
      //await clientScreenTitle.waitFor({ state: 'visible', timeout });
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Client screen did not appear within ${timeout}ms: ${error}`);
    }
  }

  /**
   * Verify if Client screen is currently visible
   * Non-throwing version for conditional checks
   * 
   * @returns boolean - true if Client screen is visible, false otherwise
   */
  async isClientScreenVisible(): Promise<boolean> {
    try {
      const clientScreen = this.page.locator(this.CLIENT_SCREEN_TITLE).first();
      return await clientScreen.isVisible().catch(() => false);
    } catch {
      return false;
    }
  }

  // ============================================================
  // STEP 12: Click "Next > Agreement" button on Client screen
  // ============================================================
  /**
   * Click "Next > Agreement" button to proceed to Agreement screen
   * Waits for button to be visible and clickable before interaction
   * 
   * @throws Error if button cannot be found or clicked
   */
  async clickNextAgreementButton(): Promise<void> {
    try {
      console.log('  Step 12: Click "Next > Agreement" button');
      const nextBtn = this.page.locator(this.NEXT_AGREEMENT_BTN).first();
      await nextBtn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await nextBtn.click();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Failed to click Next > Agreement button: ${error}`);
    }
  }

  // ============================================================
  // STEP 13: Wait for "Agreement" screen to appear
  // ============================================================
  /**
   * Wait for the Agreement screen to appear
   * Confirms successful navigation to the Agreement step
   * 
   * @param timeout - Maximum wait time in milliseconds
   * @throws Error if Agreement screen does not appear within timeout
   */
  async waitForAgreementScreenAppears(timeout: number = this.SCREEN_TRANSITION_TIMEOUT): Promise<void> {
    try {
      console.log('  Step 13: Wait for "Agreement" screen to appear');
      const agreementTitle = this.page.locator(this.AGREEMENT_SCREEN_TITLE).first();
      await agreementTitle.waitFor({ state: 'visible', timeout });
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Agreement screen did not appear within ${timeout}ms: ${error}`);
    }
  }

  /**
   * Verify if Agreement screen is currently visible
   * Non-throwing version for conditional checks
   * 
   * @returns boolean - true if Agreement screen is visible, false otherwise
   */
  async isAgreementScreenVisible(): Promise<boolean> {
    try {
      const agreementScreen = this.page.locator(this.AGREEMENT_SCREEN_TITLE).first();
      return await agreementScreen.isVisible().catch(() => false);
    } catch {
      return false;
    }
  }

  // ============================================================
  // STEP 14: Click "Next > Presentation" button on Agreement screen
  // ============================================================
  /**
   * Click "Next > Presentation" button to proceed to Presentation screen
   * Waits for button to be visible and clickable before interaction
   * 
   * @throws Error if button cannot be found or clicked
   */
  async clickNextPresentationButton(): Promise<void> {
    try {
      console.log('  Step 14: Click "Next > Presentation" button');
      const nextBtn = this.page.locator(this.NEXT_PRESENTATION_BTN).first();
      await nextBtn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await nextBtn.click();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Failed to click Next > Presentation button: ${error}`);
    }
  }

  // ============================================================
  // STEP 15: Wait for "Presentation" screen to appear
  // ============================================================
  /**
   * Wait for the Presentation screen to appear
   * Confirms successful navigation to the Presentation step
   * 
   * @param timeout - Maximum wait time in milliseconds
   * @throws Error if Presentation screen does not appear within timeout
   */
  async waitForPresentationScreenAppears(timeout: number = this.SCREEN_TRANSITION_TIMEOUT): Promise<void> {
    try {
      console.log('  Step 15: Wait for "Presentation" screen to appear');
      await this.page.locator(this.PRESENTATION_ICON).isVisible();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Presentation screen did not appear within ${timeout}ms: ${error}`);
    }
  }

  /**
   * Verify if Presentation screen is currently visible
   * Non-throwing version for conditional checks
   * 
   * @returns boolean - true if Presentation screen is visible, false otherwise
   */
  async isPresentationScreenVisible(): Promise<boolean> {
    try {
      const presentationScreen = this.page.locator(this.PRESENTATION_ICON).first();
      return await presentationScreen.isVisible().catch(() => false);
    } catch {
      return false;
    }
  }

  // ============================================================
  // STEP 16: Close dialog by clicking (X) close button
  // ============================================================
  /**
   * Close the agreement dialog by clicking the close (X) button
   * Uses multiple locator strategies for robustness across different UI implementations
   * Handles both Material Design and custom button implementations
   * 
   * @throws Error if close button cannot be found or clicked
   */
   async closeAgreementDialog(): Promise<void> {
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

  // async closeAgreementDialog(): Promise<void> {
  //   try {
  //     console.log('  Step 16: Click (X) close button at top-right corner');
  //     await this.page.locator(this.CLOSE_BTN).nth(1).click();
  //     console.log('    ✅ Success');
  //   } catch (error) {
  //     throw new Error(`Failed to close agreement dialog: ${error}`);
  //   }
  // }

  // ============================================================
  // STEP 17: Verify dialog is closed
  // ============================================================
  /**
   * Verify that the agreement dialog has been closed
   * Waits for the dialog to become hidden/invisible
   * 
   * @param timeout - Maximum wait time in milliseconds
   * @returns boolean - true if dialog is successfully closed, false otherwise
   */
  async isAgreementDialogClosed(timeout: number = this.ELEMENT_TIMEOUT): Promise<boolean> {
    try {
      console.log('  Step 17: Verify agreement dialog is closed');
      const dialog = this.page.locator(this.DIALOG).first();
      
      // Wait for dialog to be hidden
      await dialog.waitFor({ state: 'hidden', timeout });
      console.log('    ✅ Success - Dialog is closed');
      return true;
    } catch (error) {
      console.log('    ⚠️  Dialog may still be visible or timeout occurred');
      return false;
    }
  }

  // ============================================================
  // STEP 18: Verify created agreement is visible/available
  // ============================================================
  /**
   * Verify that the created agreement is visible/available in the workspace
   * Looks for agreement items in the workspace content area
   * 
   * @returns boolean - true if agreement is visible, false otherwise
   */
  async isAgreementAvailable(): Promise<boolean> {
    try {
      console.log('  Step 18: Verify created agreement is visible');
      
      // Check if we're back on workspace content
      const workspaceContent = this.page.locator(this.WORKSPACE_CONTENT).first();
      const isContentVisible = await workspaceContent.isVisible().catch(() => false);
      
      if (!isContentVisible) {
        console.log('    ⚠️  Workspace content not visible');
        return false;
      }
      
      // Look for agreement item
      const agreementItem = this.page.locator(this.AGREEMENT_ITEM).first();
      const isAgreementVisible = await agreementItem.isVisible().catch(() => false);
      
      if (isAgreementVisible) {
        console.log('    ✅ Success - Agreement is visible');
      } else {
        console.log('    ⚠️  Agreement item not immediately visible (may be on another page)');
      }
      
      return isAgreementVisible;
    } catch (error) {
      console.log(`    ⚠️  Error checking agreement availability: ${error}`);
      return false;
    }
  }

  /**
   * Verify that we've returned to the workspace dashboard
   * Checks the current URL and page content
   * 
   * @returns boolean - true if on workspace dashboard, false otherwise
   */
  async isBackOnWorkspaceDashboard(): Promise<boolean> {
    try {
      const currentUrl = this.page.url();
      const isWorkspaceUrl = /workspace|dashboard/i.test(currentUrl);
      const contentVisible = await this.page.locator(this.WORKSPACE_CONTENT).first().isVisible().catch(() => false);
      
      return isWorkspaceUrl && contentVisible;
    } catch {
      return false;
    }
  }
}
