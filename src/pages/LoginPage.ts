import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object
 * Encapsulates all interactions with the login page
 */
export class LoginPage extends BasePage {
  // Page Locators
  readonly LOGIN_URL = 'https://test-app.proposaly.io/login';
  //readonly USERNAME_INPUT = 'input[type="email"], input[name="email"], input[placeholder*="email" i]';
  readonly USERNAME_INPUT = '#mat-input-0';
  readonly PASSWORD_INPUT = '#mat-input-1';
  readonly LOGIN_BUTTON = 'button[type="submit"], button:has-text("Login"), button:has-text("Sign In")';
  readonly ERROR_MESSAGE = '.error-message, .alert-danger, [role="alert"]';
  readonly DASHBOARD_URL_PATTERN = /dashboard|home|welcome/;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin(): Promise<void> {
    await this.navigateTo(this.LOGIN_URL);
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillInput(this.USERNAME_INPUT, username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillInput(this.PASSWORD_INPUT, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.LOGIN_BUTTON);
  }

  /**
   * Perform complete login
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    // // Wait for navigation after login
    // await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if login was successful by verifying URL change
   */
//   async isLoginSuccessful(): Promise<boolean> {
//     const currentUrl = await this.getCurrentUrl();
//     return this.DASHBOARD_URL_PATTERN.test(currentUrl) && !currentUrl.includes('/login');
//   }

  /**
   * Get error message if login fails
   */
  async getErrorMessage(): Promise<string> {
    try {
      await this.waitForElement(this.ERROR_MESSAGE, 2000);
      return await this.getElementText(this.ERROR_MESSAGE);
    } catch {
      return '';
    }
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.ERROR_MESSAGE);
  }
}
