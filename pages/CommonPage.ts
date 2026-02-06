import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { TopBarNavigation } from "./components/TopBarNavigation";

export class CommonPage extends BasePage {

    private readonly topBarNavigation: TopBarNavigation;

    constructor(page: Page) {
        super(page);
        this.topBarNavigation = new TopBarNavigation(page);
    }

    getTopBarNavigation() {
        return this.topBarNavigation;
    }
}