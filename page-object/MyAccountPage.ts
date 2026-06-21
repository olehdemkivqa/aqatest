import { type Page, type Locator } from '@playwright/test'

export class MyAccountPage {
    readonly page: Page
    readonly items: Locator
    readonly totalAmountField: Locator
    readonly logoutButton: Locator

    constructor(page: Page) {
        this.page = page

        this.items = page.locator('#account-order-0 ul > li')
        this.totalAmountField = page.locator('#account-order-0 p', { hasText: "Total Amount:" })
        this.logoutButton = page.locator('[id="account-logout-button"]')
    }

    async logout () {
        await this.logoutButton.click()
    }
}