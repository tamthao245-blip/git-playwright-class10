import { Page } from "@playwright/test";
import { BasePage } from "../../base/BasePage";

export class CommonDialog extends BasePage {

    private readonly lblMsgText = this.page.locator("#swal2-title");
    private readonly btnConfirm = this.page.locator(".swal2-confirm");

    constructor(page: Page) {
        super(page);
    }

    async getTextMessage(): Promise<string | null> {
        // chờ dialog xuất hiện trước (tối đa 15s)
        await this.lblMsgText.waitFor({ state: 'visible', timeout: 15000 });
        const text = await this.getText(this.lblMsgText);

        // click ok dể đóng dialog nếu có nút confirm
        await this.btnConfirm.click({ timeout: 3000 }).catch(() => {});
        return text;
    }
}