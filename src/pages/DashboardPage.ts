import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Dashboard/Workspace Page Object
 * Encapsulates all interactions with the dashboard and workspace pages
 */
export class DashboardPage extends BasePage {
  // Workspace Locators
  readonly WORKSPACE_BUTTON = 'button:has-text("Workspace"), a:has-text("Workspace"), [data-testid*="workspace" i]';
  readonly YOUR_WORKSPACES_DIALOG = '.overlay-panel-header';
  readonly WORKSPACE_SEARCH_INPUT = '#mat-input-2';
  readonly WORKSPACE_ITEM = (workspaceName: string) => `text="${workspaceName}", [data-testid*="workspace-${workspaceName.toLowerCase()}"]`;
  readonly CREATE_PROPOSAL_BUTTON = 'button:has-text("Create proposal"), button:has-text("Create Proposal"), [data-testid="create-proposal"]';
  readonly WORKSPACE_RESULT = '.workspace-result, [role="option"], .workspace-item';
  readonly WORKSPACE_APPEARS = (workspaceName: string) => `text="${workspaceName}"`;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Click on Workspace button/link
   */
  async clickWorkspace(): Promise<void> {
    await this.clickElement(this.WORKSPACE_BUTTON);
    // Wait for "Your workspaces" dialog to appear
    await this.waitForElement(this.YOUR_WORKSPACES_DIALOG);
  }

  /**
   * Click on the search field in the dialog
   */
  async clickSearchField(): Promise<void> {
    await this.clickElement(this.WORKSPACE_SEARCH_INPUT);
  }

  /**
   * Search for a workspace by name in the dialog
   */
  async searchWorkspace(workspaceName: string): Promise<void> {
    await this.fillInput(this.WORKSPACE_SEARCH_INPUT, workspaceName);
    // Wait for search results to load
    await this.page.waitForTimeout(1000);
  }

  /**
   * Wait for workspace to appear in the search results
   */
  async waitForWorkspaceAppears(workspaceName: string, timeout: number = 5000): Promise<void> {
    await this.waitForElement(this.WORKSPACE_APPEARS(workspaceName), timeout);
  }

  /**
   * Wait for workspace to appear (page load after selection)
   */
  async waitForWorkspaceLoad(timeout: number = 5000): Promise<void> {
    // Wait for the dialog to close or navigate away
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Select workspace from search results
   */
  async selectWorkspace(workspaceName: string): Promise<void> {
    // Try multiple selector strategies to find and click the workspace
    try {
      // Strategy 1: Click using text content
      await this.page.click(`text="${workspaceName}"`);
    } catch {
      try {
        // Strategy 2: Click using data testid
        await this.clickElement(`[data-testid*="${workspaceName.toLowerCase()}"]`);
      } catch {
        // Strategy 3: Click first visible workspace result
        await this.clickElement(this.WORKSPACE_RESULT);
      }
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Create Proposal button
   */
  async clickCreateProposal(): Promise<void> {
    await this.clickElement(this.CREATE_PROPOSAL_BUTTON);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Complete workflow: Search for workspace and wait for it to appear
   */
  async searchAndWaitForWorkspace(workspaceName: string): Promise<void> {
    await this.searchWorkspace(workspaceName);
    await this.waitForWorkspaceAppears(workspaceName);
  }

  /**
   * Check if Workspace button is visible
   */
  async isWorkspaceButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.WORKSPACE_BUTTON);
  }

  /**
   * Check if Create Proposal button is visible
   */
  async isCreateProposalButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.CREATE_PROPOSAL_BUTTON);
  }

  /**
   * Check if "Your workspaces" dialog is visible
   */
  async isWorkspacesDialogVisible(): Promise<boolean> {
    return await this.isElementVisible(this.YOUR_WORKSPACES_DIALOG);
  }

  /**
   * Get current page heading/title
   */
  async getPageHeading(): Promise<string> {
    return await this.getElementText('h1, h2, [role="heading"]');
  }
}

