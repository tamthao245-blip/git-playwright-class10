import { Locator, Page } from "@playwright/test";
import { TIMEOUT } from "../constants/ConstantTimeout";

//khai bao type (alias)
type PlaywrightLocator = Locator | string

export class BasePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo(url: string) {
        await this.page.goto(url);
    }

    async input(locator: PlaywrightLocator, value: string, timeoutInSec: number = TIMEOUT.DEFAULT_TIMEOUT) {
        if(typeof locator === "string") {
            await this.page.locator(locator).fill(value);
        } else {
            await locator.fill(value);
        }
    }

    async click(locator: PlaywrightLocator, timeoutInSec: number = TIMEOUT.DEFAULT_TIMEOUT) {
        if(typeof locator === "string") {
            await this.page.locator(locator).click({timeout: timeoutInSec * 1000});
        } else {
            await locator.click({timeout: timeoutInSec * 1000})
        }
    }

    async getText(locator: PlaywrightLocator, timeoutInSec: number = TIMEOUT.DEFAULT_TIMEOUT): Promise<string|null> {
        let value;
        if(typeof locator === "string") {
            value = await this.page.locator(locator).textContent({timeout: timeoutInSec * 1000});
        } else {
            value = await locator.textContent({timeout: timeoutInSec * 1000})
        }
        return value;
    }
}