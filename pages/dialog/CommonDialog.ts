import { Page } from "@playwright/test";
import { BasePage } from "../../base/BasePage";

export class CommonDialog extends BasePage {

    private readonly lblMsgText = this.page.locator("#swal2-title");

    constructor(page: Page) {
        super(page);
    }

    async getTextMessage(): Promise<string|null> {
        let recordedText = await this.getText(this.lblMsgText);
        return recordedText;
    }
}