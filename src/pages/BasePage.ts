import { Page } from '@playwright/test';

/**
 * Base Page Object Class
 * Contains common functionality for all page objects
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Fill a text input field
   */
  async fillInput(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  /**
   * Click on an element
   */
  async clickElement(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  /**
   * Get text content of an element
   */
  async getElementText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  /**
   * Wait for an element to be visible
   */
  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
