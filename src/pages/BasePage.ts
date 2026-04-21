import { Page } from '@playwright/test';

/**
 * Base Page Object Class
 * Contains common functionality for all page objects
 * Provides robust, production-ready helper methods
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
   * First clears the field, then fills with text
   */
  async fillInput(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  /**
   * Click on an element
   * Uses the first matching element if multiple exist
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
   * @param selector - CSS or XPath selector
   * @param timeout - Maximum wait time in milliseconds (default: 5000ms)
   */
  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout, state: 'visible' });
  }

  /**
   * Check if element is visible
   * @param selector - CSS or XPath selector
   * @returns boolean - true if visible, false otherwise
   */
  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /**
   * Get current URL
   * @returns Current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Get page title
   * @returns Page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for element to be hidden/invisible
   * Useful for confirming dialogs have closed
   * 
   * @param selector - CSS or XPath selector
   * @param timeout - Maximum wait time in milliseconds (default: 5000ms)
   */
  async waitForElementHidden(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout, state: 'hidden' });
  }

  /**
   * Wait for URL to contain a specific string
   * Useful for verifying navigation
   * 
   * @param urlPart - String that should be in the URL
   * @param timeout - Maximum wait time in milliseconds (default: 10000ms)
   */
  async waitForUrlToContain(urlPart: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForURL(new RegExp(urlPart), { timeout });
  }

  /**
   * Wait for page to reach a stable state
   * @param state - Load state: 'load', 'domcontentloaded', 'networkidle' (default: 'networkidle')
   * @param timeout - Maximum wait time in milliseconds (default: 30000ms)
   */
  async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle', timeout: number = 30000): Promise<void> {
    await this.page.waitForLoadState(state, { timeout });
  }

  /**
   * Get attribute value of an element
   * @param selector - CSS or XPath selector
   * @param attributeName - Name of the attribute to get
   * @returns Attribute value or empty string if not found
   */
  async getAttribute(selector: string, attributeName: string): Promise<string> {
    return await this.page.getAttribute(selector, attributeName) || '';
  }

  /**
   * Check if element exists (is attached to DOM)
   * @param selector - CSS or XPath selector
   * @returns boolean - true if element exists, false otherwise
   */
  async elementExists(selector: string): Promise<boolean> {
    const count = await this.page.locator(selector).count();
    return count > 0;
  }

  /**
   * Get all text contents of multiple elements
   * @param selector - CSS or XPath selector
   * @returns Array of text contents
   */
  async getAllElementTexts(selector: string): Promise<string[]> {
    return await this.page.locator(selector).allTextContents();
  }

  /**
   * Pause execution for a specified time
   * Useful for debugging, but should be used sparingly in production code
   * 
   * @param ms - Milliseconds to pause
   */
  async pause(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
