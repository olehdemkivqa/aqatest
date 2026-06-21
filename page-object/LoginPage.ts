import { type Page, type Locator } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly loginButton: Locator
    readonly catalogTitle: Locator

    constructor(page: Page) {
        this.page = page
        this.emailField = page.locator('[id="login-email"]')
        this.passwordField = page.locator('[id="login-password"]')
        this.loginButton = page.locator('[id="login-button"]')
        this.catalogTitle = page.locator('[id="catalog-title"]')
    }
    
    async login(email: string, password: string) {
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.loginButton.click()
        await this.catalogTitle.waitFor()
    }
}