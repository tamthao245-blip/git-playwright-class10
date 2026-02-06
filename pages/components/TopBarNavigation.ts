import { Page } from "@playwright/test";
import { BasePage } from "../../base/BasePage";
import { TIMEOUT } from "../../constants/ConstantTimeout";


export class TopBarNavigation extends BasePage {

    private readonly lnkLogin = this.page.locator("//a[h3[text()='Đăng Nhập']]");
    private readonly lnkRegister = this.page.locator("//a[h3[text()='Đăng Ký']]");
    private readonly lnkLogout = this.page.locator("//a[h3[text()='Đăng xuất']]");
    private readonly lnkProfile = this.page.locator("//a[@href='/account']/h3");

    constructor(page: Page) {
        super(page);
    }

    async navigateRegisterPage() {
        await this.click(this.lnkRegister);
    }

    async navigateLoginPage() {
        await this.click(this.lnkLogin);
    }

    // async isLogoutLinkDisplayed(timeoutInSec: number = TIMEOUT.DEFAULT_TIMEOUT): Promise<boolean> {
    //     let isStatus = await this.lnkLogout.isVisible({timeout: timeoutInSec})
    //     return isStatus;
    // }

    async isLogoutLinkDisplayed(
        timeoutInSec: number = TIMEOUT.DEFAULT_TIMEOUT
    ): Promise<boolean> {
        let isStatus = await this.lnkLogout.isVisible({ timeout: timeoutInSec });
        return isStatus;
    }


    async getProfileName(): Promise<string | null> {
        let name = await this.getText(this.lnkProfile);
        return name;
    }
}