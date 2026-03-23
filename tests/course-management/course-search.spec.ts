import { test, expect } from '../../fixtures/custom-fixture';
import { URL } from '../../constants/ConstantUrl';
import { USER } from '../../constants/ConstantUser';
import { COURSE } from '../../constants/ConstantCourse';

test.describe("EPIC 2 - Quản lý Khóa học: Tìm kiếm & Chi tiết", () => {

    test.beforeEach(async ({ homePage, loginPage }) => {
        await homePage.goTo(URL.TRANG_CHU);
        await homePage.getTopBarNavigation().navigateLoginPage();
        await loginPage.login(USER.VALID_USERNAME, USER.VALID_PASSWORD);
        await homePage.page.waitForURL(URL.TRANG_CHU, { timeout: 15000 });
    });

    test("TC01 - Tìm kiếm khóa học có kết quả", async ({ coursePage, page }) => {
        await coursePage.searchKhoaHoc(COURSE.SEARCH_KEYWORD_EXIST);
        await expect(page).toHaveURL(new RegExp(`timkiem`));
        const count = await coursePage.getCoursResultCount();
        expect(count).toBeGreaterThan(0);
    });

    test("TC02 - Tìm kiếm khóa học không tồn tại → 0 kết quả", async ({ coursePage, page }) => {
        await coursePage.searchKhoaHoc(COURSE.SEARCH_KEYWORD_NOT_EXIST);
        await expect(page).toHaveURL(new RegExp(`timkiem`));
        const count = await coursePage.getCoursResultCount();
        expect(count).toEqual(0);
    });

    test("TC03 - Xem chi tiết khóa học thành công", async ({ coursePage, page, homePage }) => {
        //nNavigate thẳng vào trang chi tiết
        await homePage.goTo(COURSE.COURSE_DETAIL_URL);

        // VP1: URL chứa chitiet
        await expect(page).toHaveURL(new RegExp(`chitiet`), { timeout: 15000 });

        // VP2: tên khóa học hiển thị
        const isDisplayed = await coursePage.isChiTietKhoaHocDisplayed();
        expect(isDisplayed).toBeTruthy();

        // VP3: trang có sidebar giá khóa học hiển thị (ko phụ thuộc trạng thái đăng ký)
        const hasSidebar = await page.locator("div.sideBarCourseDetail").isVisible({ timeout: 5000 }).catch(() => false);
        expect(hasSidebar).toBeTruthy();
    });

});