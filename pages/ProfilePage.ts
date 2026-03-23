import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class ProfilePage extends CommonPage {

    // tab navigation
    private readonly tabKhoaHoc = this.page.locator("button.tabLink").filter({ hasText: "Khóa học" });

    // nút cập nhật để mở modal
    private readonly btnCapNhat = this.page.locator("button.btnGlobal[data-toggle='modal'][data-target='#myModal']");

    // modal
    private readonly modal = this.page.locator("#myModal");

    // inputs trong modal
    private readonly txtHoTen = this.page.locator("input[name='hoTen']");
    private readonly txtMatKhau = this.page.locator("input[name='matKhau']");
    private readonly txtEmail = this.page.locator("input[name='email']");
    private readonly txtSoDienThoai = this.page.locator("input[name='soDT']");

    // buttons trong modal
    private readonly btnHoanThanh = this.page.locator("button.btnSubmit[type='submit']");
    private readonly btnDong = this.page.locator("button.btnClose[data-dismiss='modal']");

    // thông báo thành công bên trong modal
    private readonly lblSuccessMsg = this.page.locator(".modal .alert, .modal [class*='success'], .modal p").first();

    // tab Khóa học - nút "Hủy khóa học"
    private readonly txtTimKiemKhoaHoc = this.page.locator("input[placeholder='Tìm kiếm...']");
    private readonly listBtnHuyKhoaHoc = this.page.locator("button.btnGlobal").filter({ hasText: "Hủy khóa học" });
    private readonly btnHuyKhoaHocFirst = this.page.locator("button.btnGlobal").filter({ hasText: "Hủy khóa học" }).first();

    constructor(page: Page) {
        super(page);
    }

    async clickTabKhoaHoc() {
        await this.click(this.tabKhoaHoc);
        await this.page.waitForTimeout(1000);
    }

    async clickCapNhat() {
        await this.click(this.btnCapNhat);
        await this.modal.waitFor({ state: 'visible', timeout: 10000 });
    }

    async isModalVisible(): Promise<boolean> {
        return await this.modal.isVisible({ timeout: 5000 }).catch(() => false);
    }

    async isModalClosed(): Promise<boolean> {
        return await this.modal.isHidden({ timeout: 10000 }).catch(() => false);
    }

    async updateHoTen(hoTen: string) {
        await this.txtHoTen.clear();
        await this.input(this.txtHoTen, hoTen);
    }

    async updateMatKhau(matKhau: string) {
        await this.txtMatKhau.clear();
        await this.input(this.txtMatKhau, matKhau);
    }

    async updateEmail(email: string) {
        await this.txtEmail.clear();
        await this.input(this.txtEmail, email);
    }

    async updateSoDienThoai(soDienThoai: string) {
        await this.txtSoDienThoai.clear();
        await this.input(this.txtSoDienThoai, soDienThoai);
    }

    async clickHoanThanh() {
        await this.click(this.btnHoanThanh);
    }

    async clickDong() {
        await this.click(this.btnDong);
    }

    async getSuccessMessage(): Promise<string | null> {
        await this.lblSuccessMsg.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        return await this.getText(this.lblSuccessMsg).catch(() => null);
    }

    async timKiemKhoaHocCuaToi(keyword: string) {
        await this.input(this.txtTimKiemKhoaHoc, keyword);
        await this.page.keyboard.press("Enter");
        await this.page.waitForTimeout(1000);
    }

    async isKhoaHocDisplayed(tenKhoaHoc: string): Promise<boolean> {
        return await this.page.locator(`//*[contains(text(),'${tenKhoaHoc}')]`).first()
            .isVisible({ timeout: 5000 }).catch(() => false);
    }

    async clickHuyKhoaHoc() {
        await this.click(this.btnHuyKhoaHocFirst);
    }

    async getKhoaHocCount(): Promise<number> {
        await this.page.waitForTimeout(1000);
        return await this.listBtnHuyKhoaHoc.count();
    }
}