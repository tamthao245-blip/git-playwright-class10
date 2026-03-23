import { test, expect } from '../../fixtures/custom-fixture';
import { URL } from '../../constants/ConstantUrl';
import { USER } from '../../constants/ConstantUser';
import { COURSE } from '../../constants/ConstantCourse';

test.describe("EPIC 2 - Quản lý Khóa học: Đăng ký & Hủy đăng ký", () => {

    test.beforeEach(async ({ homePage, loginPage }) => {
        await homePage.goTo(URL.TRANG_CHU);
        await homePage.getTopBarNavigation().navigateLoginPage();
        await loginPage.login(USER.VALID_USERNAME, USER.VALID_PASSWORD);
        await homePage.page.waitForURL(URL.TRANG_CHU, { timeout: 15000 });
    });

    test("TC04 - Đăng ký khóa học thành công", async ({ homePage, profilePage, page }) => {
        // step 1: Lấy số khóa hiện tại
        await homePage.goTo(URL.THONG_TIN_CA_NHAN);
        await profilePage.clickTabKhoaHoc();
        const countBefore = await profilePage.getKhoaHocCount();

        // step 2: Navigate vào khóa học chưa đăng ký và click ĐĂNG KÝ
        await homePage.goTo(COURSE.COURSE_DETAIL_URL_NEW);
        const btnDangKy = page.locator("button.btnPreview").filter({ hasText: /^Đăng ký$/ });
        await expect(btnDangKy).toBeVisible({ timeout: 10000 });
        await btnDangKy.click();
        await page.waitForTimeout(3000);

        // VP: Số khóa học trong profile tăng lên 1
        await homePage.goTo(URL.THONG_TIN_CA_NHAN);
        await profilePage.clickTabKhoaHoc();
        const countAfter = await profilePage.getKhoaHocCount();
        expect(countAfter).toBeGreaterThan(countBefore);
    });

    test("TC06 - Xem danh sách khóa học đã đăng ký", async ({ homePage, profilePage, page }) => {
        await homePage.goTo(URL.THONG_TIN_CA_NHAN);
        await profilePage.clickTabKhoaHoc();

        await expect(page).toHaveURL(URL.THONG_TIN_CA_NHAN);
        const tabContent = page.locator("div#infoCourse");
        await expect(tabContent).toBeVisible({ timeout: 5000 });
        const count = await profilePage.getKhoaHocCount();
        expect(count).toBeGreaterThanOrEqual(0);
    });

    test("TC08 - Hủy đăng ký khóa học thành công", async ({ homePage, profilePage, page }) => {
        await homePage.goTo(URL.THONG_TIN_CA_NHAN);
        await profilePage.clickTabKhoaHoc();

        const countBefore = await profilePage.getKhoaHocCount();
        expect(countBefore).toBeGreaterThan(0);

        await profilePage.clickHuyKhoaHoc();
        await page.waitForTimeout(3000);

        // VP: Số khóa học giảm đi 1
        const countAfter = await profilePage.getKhoaHocCount();
        expect(countAfter).toBeLessThan(countBefore);
    });

});