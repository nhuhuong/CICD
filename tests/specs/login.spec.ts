import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Proposaly Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('TC001: Login with valid credentials', async ({ page }) => {
    // Arrange
    const username = 'automation.adcore@gmail.com';
    const password = 'Test123@';

    // Act
    await loginPage.login(username, password);

    // // Assert
    // const isLoginSuccessful = await loginPage.isLoginSuccessful();
    // expect(isLoginSuccessful).toBeTruthy();

    // Verify we're not on login page anymore
    // const currentUrl = await loginPage.getCurrentUrl();
    // expect(currentUrl).not.toContain('/login');
  });

//   test('TC002: Verify login page loads correctly', async () => {
//     // Assert
//     const currentUrl = await loginPage.getCurrentUrl();
//     expect(currentUrl).toContain('/login');
//   });

//   test('TC003: Verify email field is visible', async ({ page }) => {
//     // Assert
//     const emailInputVisible = await page.isVisible('input[type="email"], input[name="email"], input[placeholder*="email" i]');
//     expect(emailInputVisible).toBeTruthy();
//   });

//   test('TC004: Verify password field is visible', async ({ page }) => {
//     // Assert
//     const passwordInputVisible = await page.isVisible('input[type="password"]');
//     expect(passwordInputVisible).toBeTruthy();
//   });

//   test('TC005: Verify login button is visible', async ({ page }) => {
//     // Assert
//     const loginButtonVisible = await page.isVisible('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")');
//     expect(loginButtonVisible).toBeTruthy();
//   });
});
