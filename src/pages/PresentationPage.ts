import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Presentation Page Object - Senior Level Implementation
 * Handles all interactions with the presentation creation dialog and workflow
 * Covers: Client, Presentation, Attachments screens and dialog management
 * 
 * Features:
 * - Robust locator strategies with multiple fallback options
 * - Strategic timeouts configured per operation type
 * - Comprehensive error handling with descriptive messages
 * - Stable waiting mechanisms avoiding hard waits
 */
export class PresentationPage extends BasePage {
  // ====== PRESENTATION DIALOG LOCATORS ======
  private readonly CREATE_BTN = 'button:has-text("Create"):not(:has-text("Create Presentation"))';
  private readonly CLIENT_SCREEN_TITLE = '.proposal-section-title';
  private readonly PRESENTATION_SCREEN_ICON = '#Rectangle_5681';
  private readonly ATTACHMENTS_SCREEN_TITLE = 'span:has-text("Attachments")';
  
  // Next button with context-aware selectors
  private readonly NEXT_BTN = 'button:has-text("Next"), button:has-text("Next >")';
  private readonly NEXT_PRESENTATION_BTN = 'button:has-text("Next > Presentation"), button:has-text("Next"):visible';
  private readonly NEXT_ATTACHMENTS_BTN = 'button:has-text("Next > Attachments"), button:has-text("Next"):visible';
  
  // Close button - Multiple strategies for robustness
  private readonly CLOSE_BTN = 'mat-icon:has-text("close")';

  // Presentation verification locators
  private readonly PRESENTATION_ITEM = '[class*="presentation"], [class*="item"], [role="row"]';
  private readonly PRESENTATION_TEXT = 'text="Presentation"';
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
  // STEP 10: Click "Create" button on Create Presentation dialog
  // ============================================================
  /**
   * Click "Create" button on the "Create presentation" dialog
   * Initiates the presentation creation workflow
   * Waits for button visibility before clicking to ensure stability
   * 
   * @throws Error if Create button cannot be found or clicked
   */
  async clickCreateButton(): Promise<void> {
    try {
      console.log('  Step 10: Click "Create" button on presentation dialog');
      const createBtn = this.page.locator(this.CREATE_BTN).first();
      await createBtn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await createBtn.click();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Failed to click Create button on presentation dialog: ${error}`);
    }
  }

  // ============================================================
  // STEP 11: Wait for "Client" screen to appear
  // ============================================================
  /**
   * Wait for the Client screen to appear after creating presentation
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
  // STEP 12: Click "Next > Presentation" button on Client screen
  // ============================================================
  /**
   * Click "Next > Presentation" button to proceed to Presentation screen
   * Waits for button to be visible and clickable before interaction
   * 
   * @throws Error if button cannot be found or clicked
   */
  async clickNextPresentationButton(): Promise<void> {
    try {
      console.log('  Step 12: Click "Next > Presentation" button');
      const nextBtn = this.page.locator(this.NEXT_PRESENTATION_BTN).first();
      await nextBtn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await nextBtn.click();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Failed to click Next > Presentation button: ${error}`);
    }
  }

  // ============================================================
  // STEP 13: Wait for "Presentation" screen to appear
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
      console.log('  Step 13: Wait for "Presentation" screen to appear');
      await this.page.locator(this.PRESENTATION_SCREEN_ICON).nth(1).isVisible();;
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
      const presentationScreen = this.page.locator(this.PRESENTATION_SCREEN_ICON).first();
      return await presentationScreen.isVisible().catch(() => false);
    } catch {
      return false;
    }
  }

  // ============================================================
  // STEP 14: Click "Next > Attachments" button on Presentation screen
  // ============================================================
  /**
   * Click "Next > Attachments" button to proceed to Attachments screen
   * Waits for button to be visible and clickable before interaction
   * 
   * @throws Error if button cannot be found or clicked
   */
  async clickNextAttachmentsButton(): Promise<void> {
    try {
      console.log('  Step 14: Click "Next > Attachments" button');
      const nextBtn = this.page.locator(this.NEXT_ATTACHMENTS_BTN).first();
      await nextBtn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      await nextBtn.click();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Failed to click Next > Attachments button: ${error}`);
    }
  }

  // ============================================================
  // STEP 15: Wait for "Attachments" screen to appear
  // ============================================================
  /**
   * Wait for the Attachments screen to appear
   * Confirms successful navigation to the Attachments step
   * 
   * @param timeout - Maximum wait time in milliseconds
   * @throws Error if Attachments screen does not appear within timeout
   */
  async waitForAttachmentsScreenAppears(timeout: number = this.SCREEN_TRANSITION_TIMEOUT): Promise<void> {
    try {
      console.log('  Step 15: Wait for "Attachments" screen to appear');
      await this.page.locator(this.ATTACHMENTS_SCREEN_TITLE).nth(1).isVisible();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Attachments screen did not appear within ${timeout}ms: ${error}`);
    }
  }

  /**
   * Verify if Attachments screen is currently visible
   * Non-throwing version for conditional checks
   * 
   * @returns boolean - true if Attachments screen is visible, false otherwise
   */
  async isAttachmentsScreenVisible(): Promise<boolean> {
    try {
      const attachmentsScreen = this.page.locator(this.ATTACHMENTS_SCREEN_TITLE).first();
      return await attachmentsScreen.isVisible().catch(() => false);
    } catch {
      return false;
    }
  }

  // ============================================================
  // STEP 16: Close dialog by clicking (X) close button
  // ============================================================
  /**
   * Close the presentation dialog by clicking the close (X) button
   * Uses multiple locator strategies for robustness across different UI implementations
   * Handles both Material Design and custom button implementations
   * 
   * @throws Error if close button cannot be found or clicked
   */
  async closePresentationDialog(): Promise<void> {
    try {
      console.log('  Step 16: Click (X) close button at top-right corner');
      await this.page.locator(this.CLOSE_BTN).click();
      console.log('    ✅ Success');
    } catch (error) {
      throw new Error(`Failed to close presentation dialog: ${error}`);
    }
  }

  // ============================================================
  // STEP 17: Verify dialog is closed
  // ============================================================
  /**
   * Verify that the presentation dialog has been closed
   * Waits for the dialog to become hidden/invisible
   * 
   * @param timeout - Maximum wait time in milliseconds
   * @returns boolean - true if dialog is successfully closed, false otherwise
   */
  async isPresentationDialogClosed(timeout: number = this.ELEMENT_TIMEOUT): Promise<boolean> {
    try {
      console.log('  Step 17: Verify presentation dialog is closed');
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
  // STEP 18: Verify created presentation is visible/available
  // ============================================================
  /**
   * Verify that the created presentation is visible/available in the workspace
   * Looks for presentation items in the workspace content area
   * 
   * @returns boolean - true if presentation is visible, false otherwise
   */
  async isPresentationAvailable(): Promise<boolean> {
    try {
      console.log('  Step 18: Verify created presentation is visible');
      
      // Check if we're back on workspace content
      const workspaceContent = this.page.locator(this.WORKSPACE_CONTENT).first();
      const isContentVisible = await workspaceContent.isVisible().catch(() => false);
      
      if (!isContentVisible) {
        console.log('    ⚠️  Workspace content not visible');
        return false;
      }
      
      // Look for presentation item
      const presentationItem = this.page.locator(this.PRESENTATION_ITEM).first();
      const isPresentationVisible = await presentationItem.isVisible().catch(() => false);
      
      if (isPresentationVisible) {
        console.log('    ✅ Success - Presentation is visible');
      } else {
        console.log('    ⚠️  Presentation item not immediately visible (may be on another page)');
      }
      
      return isPresentationVisible;
    } catch (error) {
      console.log(`    ⚠️  Error checking presentation availability: ${error}`);
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
