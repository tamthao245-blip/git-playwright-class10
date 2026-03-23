import { Page } from "@playwright/test";
import { BasePage } from "../../base/BasePage";
import { TIMEOUT } from "../../constants/ConstantTimeout";

export class TopBarNavigation extends BasePage {

    // chưa login
    private readonly btnLogin = this.page.locator("button.btnGlobal a[href='/login']");

    // đã login
    private readonly lnkProfile = this.page.locator("a.infoHeader[href='/thongtincanhan']");

    // đ ăng xuất
    private readonly lnkLogout = this.page.locator("span.logout a");

    constructor(page: Page) {
        super(page);
    }

    async navigateLoginPage() {
        await this.click(this.btnLogin);
    }

    async isLogoutLinkDisplayed(timeoutInSec: number = TIMEOUT.DEFAULT_TIMEOUT): Promise<boolean> {
        return await this.lnkLogout.isVisible({ timeout: timeoutInSec * 1000 }).catch(() => false);
    }

    async getProfileName(): Promise<string | null> {
        return await this.getText(this.lnkProfile).catch(() => null);
    }
}