import  { test as base } from "@playwright/test";
import { CommonDialog } from '../pages/dialog/CommonDialog';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

// Declare the types of your fixtures.
type MyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
    commonDialog: CommonDialog;
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page);

    // Use the fixture value in the test.
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  commonDialog: async ({ page }, use) => {
    await use(new CommonDialog(page));
  }
});
export { expect } from '@playwright/test';