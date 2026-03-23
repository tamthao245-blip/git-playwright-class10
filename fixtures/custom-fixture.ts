import { test as base } from "@playwright/test";
import { CommonDialog } from '../pages/dialog/CommonDialog';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { CoursePage } from '../pages/CoursePage';

type MyFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    commonDialog: CommonDialog;
    profilePage: ProfilePage;
    coursePage: CoursePage;
};

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    commonDialog: async ({ page }, use) => {
        await use(new CommonDialog(page));
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    },
    coursePage: async ({ page }, use) => {
        await use(new CoursePage(page));
    },
});

export { expect } from '@playwright/test';