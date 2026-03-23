import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class CoursePage extends CommonPage {

    // search input desktop
    private readonly txtSearchHeader = this.page.locator("input.searchForm");

    // kết quả tìm kiếm
    private readonly listLinkXemChiTiet = this.page.locator("button.btnGlobal a[href*='chitiet']");

    // trang chi tiết 
    private readonly btnDangKy = this.page.locator("button.btnPreview").filter({ hasText: /^Đăng ký$/ });

    // tên khóa học
    private readonly lblTenKhoaHoc = this.page.locator("h4.titleDetailCourse");

    constructor(page: Page) {
        super(page);
    }

    async searchKhoaHoc(keyword: string) {
        await this.input(this.txtSearchHeader, keyword);
        await this.page.keyboard.press("Enter");
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getCoursResultCount(): Promise<number> {
        await this.page.waitForTimeout(2000);
        return await this.listLinkXemChiTiet.count();
    }

    async clickXemChiTiet() {
        const href = await this.listLinkXemChiTiet.first().getAttribute('href');
        if (href) {
            await this.page.goto(`https://demo2.cybersoft.edu.vn${href}`, { waitUntil: 'domcontentloaded' });
        }
    }

    async isChiTietKhoaHocDisplayed(): Promise<boolean> {
        return await this.lblTenKhoaHoc.isVisible({ timeout: 5000 }).catch(() => false);
    }

    async clickDangKy() {
        await this.click(this.btnDangKy);
    }

    async isDangKyButtonVisible(): Promise<boolean> {
        return await this.btnDangKy.isVisible({ timeout: 5000 }).catch(() => false);
    }
}