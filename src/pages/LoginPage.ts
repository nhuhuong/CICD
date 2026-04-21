import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object - Senior Level Implementation
 * Robust, maintainable automation with strategic error handling
 * 
 * Features:
 * - Multiple locator strategies for stability
 * - Explicit waits with configurable timeouts
 * - Comprehensive error handling
 * - Detailed logging support
 * - Flaky-behavior resilience
 */
export class LoginPage extends BasePage {
  // ====== PAGE CONFIGURATION ======
  private readonly LOGIN_URL = 'https://test-app.proposaly.io/login';
  private readonly DASHBOARD_URL_PATTERN = /dashboard|home|workspace|proposal/i;

  // ====== LOCATORS - MULTI-STRATEGY APPROACH ======
  // Email Input - Multiple strategies for robustness
  private readonly USERNAME_INPUT = 'input[type="email"], input[name="email"], input[placeholder*="email" i], #mat-input-0, input[aria-label*="email" i]';
  
  // Password Input - Multiple strategies
  private readonly PASSWORD_INPUT = 'input[type="password"], input[name="password"], input[placeholder*="password" i], #mat-input-1, input[aria-label*="password" i]';
  
  // Login Button - Multiple text variations
  private readonly LOGIN_BUTTON = 'button[type="submit"], button:has-text("Login"), button:has-text("Sign In"), button:has-text("Sign In"), [aria-label*="login" i]';
  
  // Error Messages - Multiple selectors
  private readonly ERROR_MESSAGE = '[role="alert"], .error-message, .alert-danger, .mat-error, [class*="error"]';
  
  // Page Elements
  private readonly LOGIN_PAGE_HEADING = 'h1, h2, [role="heading"], .login-title';
  private readonly LOGIN_FORM = 'form, [role="main"], [class*="login"], [class*="sign-in"]';
  
  // Loading States
  private readonly LOADING_SPINNER = '[role="progressbar"], .spinner, [class*="loading"], mat-spinner';
  
  // ====== TIMEOUTS (in milliseconds) ======
  private readonly PAGE_LOAD_TIMEOUT = 15000;
  private readonly ELEMENT_TIMEOUT = 10000;
  private readonly ACTION_TIMEOUT = 5000;
  private readonly NETWORK_TIMEOUT = 10000;

  constructor(page: Page) {
    super(page);
  }

  // ============================================================
  // NAVIGATION METHODS
  // ============================================================

  /**
   * Navigate to login page
   * Handles page load and waits for login form to be ready
   * 
   * @throws Error if login page fails to load
   */
  async navigateToLogin(): Promise<void> {
    try {
      console.log('Navigating to login page...');
      await this.navigateTo(this.LOGIN_URL);
      
      // Wait for page to load
      await this.page.waitForLoadState('domcontentloaded', { timeout: this.PAGE_LOAD_TIMEOUT });
      
      // Wait for login form to be visible
      await this.page.locator(this.LOGIN_FORM).first().waitFor({
        state: 'visible',
        timeout: this.ELEMENT_TIMEOUT
      });
      
      console.log('✅ Login page loaded successfully');
    } catch (error) {
      throw new Error(`Failed to navigate to login page: ${error}`);
    }
  }

  /**
   * Check if on login page
   */
  async isOnLoginPage(): Promise<boolean> {
    try {
      const currentUrl = this.page.url();
      return currentUrl.includes('/login');
    } catch {
      return false;
    }
  }

  // ============================================================
  // INPUT METHODS - EMAIL & PASSWORD
  // ============================================================

  /**
   * Enter email address with robust locating and error handling
   * Uses type() for realistic user input simulation
   * 
   * @param email - Email address to enter
   * @throws Error if email input cannot be filled
   */
  async enterUsername(email: string): Promise<void> {
    try {
      console.log(`Entering email: ${email}`);
      const emailInput = this.page.locator(this.USERNAME_INPUT).first();
      
      // Wait for input to be visible and ready
      await emailInput.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      
      // Clear any existing value
      await emailInput.clear();
      
      // Type email (more realistic than fill)
      await emailInput.type(email, { delay: 50 });
      
      // Verify the value was entered correctly
      const enteredValue = await emailInput.inputValue();
      if (enteredValue !== email) {
        throw new Error(`Email not entered correctly. Expected: ${email}, Got: ${enteredValue}`);
      }
      
      console.log('✅ Email entered successfully');
    } catch (error) {
      throw new Error(`Failed to enter email: ${error}`);
    }
  }

  /**
   * Enter password with robust locating and error handling
   * Uses type() for realistic user input simulation
   * 
   * @param password - Password to enter
   * @throws Error if password input cannot be filled
   */
  async enterPassword(password: string): Promise<void> {
    try {
      console.log('Entering password...');
      const passwordInput = this.page.locator(this.PASSWORD_INPUT).first();
      
      // Wait for input to be visible and ready
      await passwordInput.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      
      // Clear any existing value
      await passwordInput.clear();
      
      // Type password (more realistic than fill)
      await passwordInput.type(password, { delay: 50 });
      
      // Verify the value was entered (without logging the actual password)
      const enteredValue = await passwordInput.inputValue();
      if (enteredValue.length !== password.length) {
        throw new Error(`Password length mismatch`);
      }
      
      console.log('✅ Password entered successfully');
    } catch (error) {
      throw new Error(`Failed to enter password: ${error}`);
    }
  }

  // ============================================================
  // BUTTON CLICK METHODS
  // ============================================================

  /**
   * Click login button with robust detection and error handling
   * Waits for button to be clickable and handles potential overlays
   * 
   * @throws Error if login button cannot be clicked
   */
  async clickLoginButton(): Promise<void> {
    try {
      console.log('Clicking login button...');
      const loginBtn = this.page.locator(this.LOGIN_BUTTON).first();
      
      // Wait for button to be visible
      await loginBtn.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      
      // Ensure button is enabled
      const isEnabled = await loginBtn.isEnabled();
      if (!isEnabled) {
        throw new Error('Login button is disabled');
      }
      
      // Click the button (with force:false for natural interaction)
      await loginBtn.click({ force: false });
      
      console.log('✅ Login button clicked');
    } catch (error) {
      throw new Error(`Failed to click login button: ${error}`);
    }
  }

  // ============================================================
  // COMPOUND ACTIONS
  // ============================================================

  /**
   * Complete login flow with all steps
   * Combines username, password entry, and login button click
   * 
   * @param email - Email address
   * @param password - Password
   * @throws Error if any step fails
   */
  async login(email: string, password: string): Promise<void> {
    try {
      console.log('🔐 Starting login process...\n');
      
      // Step 1: Enter credentials
      await this.enterUsername(email);
      await this.enterPassword(password);
      
      // Step 2: Click login button
      await this.clickLoginButton();
      
      // Step 3: Wait for navigation
      console.log('Waiting for page navigation...');
      await this.waitForLoginCompletion();
      
      console.log('\n✅ Login completed successfully\n');
    } catch (error) {
      throw new Error(`Login flow failed: ${error}`);
    }
  }

  /**
   * Wait for login to complete by checking for successful navigation
   * Handles loading spinners and waits for dashboard URL
   * 
   * @throws Error if login does not complete within timeout
   */
  private async waitForLoginCompletion(timeout: number = this.NETWORK_TIMEOUT): Promise<void> {
    try {
      // Wait for any loading spinner to disappear
      await this.page.locator(this.LOADING_SPINNER).first().waitFor({
        state: 'hidden',
        timeout: this.ACTION_TIMEOUT
      }).catch(() => {
        // Spinner might not exist, which is fine
      });
      
      // Wait for successful navigation (URL pattern or dashboard visibility)
      await this.page.waitForURL(this.DASHBOARD_URL_PATTERN, { timeout });
      
      // Additional wait for network to be idle
      await this.page.waitForLoadState('networkidle', { timeout: this.ACTION_TIMEOUT }).catch(() => {
        // Network idle might timeout, which is acceptable
      });
      
      console.log('✅ Login navigation confirmed');
    } catch (error) {
      throw new Error(`Login did not complete: ${error}`);
    }
  }

  /**
   * Perform login with detailed assertions
   * Useful for automated test validation
   */
  async loginAndAssert(email: string, password: string): Promise<void> {
    await this.login(email, password);
    
    // Verify successful login
    const isLoggedIn = await this.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
  }

  // ============================================================
  // VERIFICATION METHODS
  // ============================================================

  /**
   * Check if login was successful by verifying URL change and page state
   * 
   * @returns boolean indicating login success
   */
  async isLoginSuccessful(): Promise<boolean> {
    try {
      const currentUrl = this.page.url();
      const isCorrectUrl = this.DASHBOARD_URL_PATTERN.test(currentUrl) && !currentUrl.includes('/login');
      
      if (!isCorrectUrl) {
        console.warn(`Expected dashboard URL but got: ${currentUrl}`);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error(`Error checking login success: ${error}`);
      return false;
    }
  }

  /**
   * Verify that we are on the login page
   */
  async verifyLoginPageLoaded(): Promise<void> {
    try {
      const form = this.page.locator(this.LOGIN_FORM).first();
      await form.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
      
      const emailInput = this.page.locator(this.USERNAME_INPUT).first();
      await emailInput.waitFor({ state: 'visible', timeout: this.ELEMENT_TIMEOUT });
    } catch (error) {
      throw new Error(`Login page verification failed: ${error}`);
    }
  }

  /**
   * Check if login button is visible and enabled
   */
  async isLoginButtonReady(): Promise<boolean> {
    try {
      const loginBtn = this.page.locator(this.LOGIN_BUTTON).first();
      const isVisible = await loginBtn.isVisible();
      const isEnabled = await loginBtn.isEnabled();
      return isVisible && isEnabled;
    } catch {
      return false;
    }
  }

  // ============================================================
  // ERROR HANDLING METHODS
  // ============================================================

  /**
   * Get error message displayed on login page
   * Useful for validating error scenarios
   * 
   * @returns Error message text or empty string if no error
   */
  async getErrorMessage(): Promise<string> {
    try {
      const errorElement = this.page.locator(this.ERROR_MESSAGE).first();
      const isVisible = await errorElement.isVisible().catch(() => false);
      
      if (!isVisible) {
        return '';
      }
      
      const errorText = await errorElement.textContent();
      return errorText?.trim() || '';
    } catch (error) {
      console.warn(`Could not retrieve error message: ${error}`);
      return '';
    }
  }

  /**
   * Check if error message is displayed
   * 
   * @returns boolean indicating if error is visible
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    try {
      const errorElement = this.page.locator(this.ERROR_MESSAGE).first();
      return await errorElement.isVisible().catch(() => false);
    } catch {
      return false;
    }
  }

  /**
   * Wait for error message to appear (useful for negative test cases)
   * 
   * @param timeout - Maximum wait time in milliseconds
   * @throws Error if error message does not appear
   */
  async waitForErrorMessage(timeout: number = this.ELEMENT_TIMEOUT): Promise<void> {
    try {
      const errorElement = this.page.locator(this.ERROR_MESSAGE).first();
      await errorElement.waitFor({ state: 'visible', timeout });
    } catch (error) {
      throw new Error(`Error message did not appear: ${error}`);
    }
  }

  /**
   * Get specific error message and verify it matches expected text
   * 
   * @param expectedText - Expected error message text (partial match)
   * @returns boolean indicating if error matches
   */
  async hasErrorMessage(expectedText: string): Promise<boolean> {
    try {
      const errorMessage = await this.getErrorMessage();
      return errorMessage.toLowerCase().includes(expectedText.toLowerCase());
    } catch {
      return false;
    }
  }

  // ============================================================
  // UTILITY METHODS
  // ============================================================

  /**
   * Get login page title/heading
   */
  async getPageTitle(): Promise<string> {
    try {
      const heading = this.page.locator(this.LOGIN_PAGE_HEADING).first();
      const title = await heading.textContent();
      return title?.trim() || '';
    } catch {
      return '';
    }
  }

  /**
   * Clear login form (useful for retry scenarios)
   */
  async clearForm(): Promise<void> {
    try {
      console.log('Clearing login form...');
      const emailInput = this.page.locator(this.USERNAME_INPUT).first();
      const passwordInput = this.page.locator(this.PASSWORD_INPUT).first();
      
      await emailInput.clear();
      await passwordInput.clear();
      
      console.log('✅ Form cleared');
    } catch (error) {
      throw new Error(`Failed to clear form: ${error}`);
    }
  }

  /**
   * Check if email input is visible
   */
  async isEmailInputVisible(): Promise<boolean> {
    return await this.page.locator(this.USERNAME_INPUT).first().isVisible().catch(() => false);
  }

  /**
   * Check if password input is visible
   */
  async isPasswordInputVisible(): Promise<boolean> {
    return await this.page.locator(this.PASSWORD_INPUT).first().isVisible().catch(() => false);
  }

  /**
   * Take screenshot for debugging
   * 
   * @param filename - Filename for screenshot
   */
  async takeScreenshot(filename: string = 'login-page'): Promise<void> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await this.page.screenshot({ path: `./screenshots/${filename}-${timestamp}.png` });
      console.log(`📸 Screenshot saved: ${filename}`);
    } catch (error) {
      console.warn(`Could not save screenshot: ${error}`);
    }
  }
}
