import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class LoginPage extends CommonPage {

    private readonly txtAccountLogin = this.page.locator("#taiKhoan");
    private readonly txtPasswordLogin = this.page.locator("#matKhau");
    private readonly btnLogin = this.page.locator("//button[span[text()='Đăng nhập']]");

    constructor(page: Page) {
        super(page);
    }

    async enterAccount(account: string) {
        await this.input(this.txtAccountLogin, account);
    }

    async enterPassword(password: string) {
        await this.input(this.txtPasswordLogin, password);
    }

    async clickLogin() {
        await this.click(this.btnLogin);
    }

    async login(username: string, password: string) {
        await this.enterAccount(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}