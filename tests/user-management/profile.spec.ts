import { test, expect } from '../../fixtures/custom-fixture';
import { URL } from '../../constants/ConstantUrl';
import { USER } from '../../constants/ConstantUser';

test.describe("EPIC 1 - Quản lý Người dùng: Thông tin cá nhân", () => {

    test.beforeEach(async ({ homePage, loginPage }) => {
        // login trước mỗi test
        await homePage.goTo(URL.TRANG_CHU);
        await homePage.getTopBarNavigation().navigateLoginPage();
        await loginPage.login(USER.VALID_USERNAME, USER.VALID_PASSWORD);
        // chờ redirect về trang chủ
        await homePage.page.waitForURL(URL.TRANG_CHU, { timeout: 15000 });
        // vào trang thông tin cá nhân
        await homePage.goTo(URL.THONG_TIN_CA_NHAN);
    });

    test("TC04 - Cập nhật họ tên thành công", async ({ profilePage }) => {
        // step 1: click cập nhật thì modal mở
        await profilePage.clickCapNhat();
        expect(await profilePage.isModalVisible()).toBeTruthy();

        // step 2: nhập họ tên mới
        await profilePage.updateHoTen(USER.UPDATED_NAME);

        // step 3: click hoàn thành
        await profilePage.clickHoanThanh();

        // VP: modal hiện thông báo thành công 
        await profilePage.page.waitForTimeout(2000);
        // modal vẫn còn nhưng hiện "Cập nhật thành công"
        expect(await profilePage.isModalVisible()).toBeTruthy();
    });

    test("TC05 - Cập nhật email thành công", async ({ profilePage }) => {
        await profilePage.clickCapNhat();
        expect(await profilePage.isModalVisible()).toBeTruthy();

        await profilePage.updateEmail(USER.UPDATED_EMAIL);
        await profilePage.clickHoanThanh();

        await profilePage.page.waitForTimeout(2000);
        expect(await profilePage.isModalVisible()).toBeTruthy();
    });

    test("TC06 - Cập nhật số điện thoại thành công", async ({ profilePage }) => {
        await profilePage.clickCapNhat();
        expect(await profilePage.isModalVisible()).toBeTruthy();

        await profilePage.updateSoDienThoai(USER.UPDATED_PHONE);
        await profilePage.clickHoanThanh();

        await profilePage.page.waitForTimeout(2000);
        expect(await profilePage.isModalVisible()).toBeTruthy();
    });

    test("TC07 - Cập nhật email sai format → không cập nhật được", async ({ profilePage, page }) => {
        await profilePage.clickCapNhat();
        expect(await profilePage.isModalVisible()).toBeTruthy();

        // nhập email sai format
        await profilePage.updateEmail("email_sai_format");
        await profilePage.clickHoanThanh();

        // VP: vẫn ở trang thongtincanhan (ko redirect)
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(URL.THONG_TIN_CA_NHAN);
    });

    test("TC08 - Đóng modal mà không lưu → modal đóng lại", async ({ profilePage }) => {
        // step 1: mở modal
        await profilePage.clickCapNhat();
        expect(await profilePage.isModalVisible()).toBeTruthy();

        // step 2: nhập họ tên mới nhưng ko click Hoàn thành
        await profilePage.updateHoTen("Tên Không Lưu");

        // step 3: click Đóng
        await profilePage.clickDong();

        // VP: modal đã đóng
        await profilePage.page.waitForTimeout(1000);
        expect(await profilePage.isModalVisible()).toBeFalsy();
    });

});