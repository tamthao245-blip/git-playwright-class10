import { test, expect } from '../../fixtures/custom-fixture';
import { URL } from '../../constants/ConstantUrl';
import { USER } from '../../constants/ConstantUser';

test.describe("EPIC 1 - Quản lý Người dùng: Login", () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.goTo(URL.TRANG_CHU);
    });

    test("TC01 - Login thành công với tài khoản hợp lệ", async ({ homePage, loginPage, page }) => {
        // step 1: click 'đăng nhập' trên top bar
        await homePage.getTopBarNavigation().navigateLoginPage();

        // step 2: nhập tài khoản và mật khẩu hợp lệ
        await loginPage.login(USER.VALID_USERNAME, USER.VALID_PASSWORD);

        // VP1: redirect về trang chủ sau khi login
        await page.waitForURL(`${URL.TRANG_CHU}`, { timeout: 15000 });
        await expect(page).toHaveURL(URL.TRANG_CHU);

        // VP2: avatar xuất hiện thì đã login
        const isLogoutDisplayed = await homePage.getTopBarNavigation().isLogoutLinkDisplayed();
        expect(isLogoutDisplayed).toBeTruthy();
    });

    test("TC02 - Login thất bại với mật khẩu sai", async ({ homePage, loginPage, page }) => {
        // step 1: click 'đăng nhập'
        await homePage.getTopBarNavigation().navigateLoginPage();

        // step 2: nhập tài khoản đúng, mật khẩu sai
        await loginPage.login(USER.VALID_USERNAME, USER.INVALID_PASSWORD);

        // VP1: vẫn ở trang login (không redirect)
        await page.waitForTimeout(3000);
        await expect(page).toHaveURL(/login/);

        // VP2: avatar ko xuất hiện
        const isLogoutDisplayed = await homePage.getTopBarNavigation().isLogoutLinkDisplayed();
        expect(isLogoutDisplayed).toBeFalsy();
    });

    test("TC03 - Login thất bại khi để trống username và password", async ({ homePage, loginPage, page }) => {
        // step 1: click 'đăng nhập'
        await homePage.getTopBarNavigation().navigateLoginPage();

        // step 2: click lgin mà không nhập gì
        await loginPage.clickLogin();

        // VP1: vẫn ở trang login
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(/login/);

        // VP2: avatar ko xuất hiện
        const isLogoutDisplayed = await homePage.getTopBarNavigation().isLogoutLinkDisplayed();
        expect(isLogoutDisplayed).toBeFalsy();
    });

});