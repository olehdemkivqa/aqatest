import { type Page, type Locator } from '@playwright/test'
import { type newUser1 } from '../data/testData'

export class RegisterPage {
    readonly page: Page
    readonly registerBtn: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly cityInput: Locator
    readonly countryDropdown: Locator
    readonly phoneInput: Locator
    readonly streetInput: Locator
    readonly zipCodeInput: Locator
    readonly submitRegisterBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.registerBtn = page.locator('[id=login-register-button]')
        this.firstNameInput = page.locator('[id=register-first-name]')
        this.lastNameInput = page.locator('[id=register-last-name]')
        this.emailInput = page.locator('[id=register-email]')
        this.passwordInput = page.locator('[id=register-password]')
        this.cityInput = page.locator('[id=register-city]')
        this.countryDropdown = page.locator('[id=register-country]')
        this.phoneInput = page.locator('[id=register-phone]')
        this.streetInput = page.locator('[id=register-street]')
        this.zipCodeInput = page.locator('[id=register-zip]')
        this.submitRegisterBtn = page.locator('[id=register-button]')
    }

    async openLoginPage() {
        await this.page.goto('/login')
    }

    async fillRegistrationForm(testData: typeof newUser1) {
      await this.registerBtn.click()
      await this.firstNameInput.fill(testData.firstName)
      await this.lastNameInput.fill(testData.lastName)
      await this.emailInput.fill(testData.email)
      await this.passwordInput.fill(testData.password)
      await this.cityInput.fill(testData.city)
      await this.countryDropdown.selectOption(testData.country)
      await this.phoneInput.fill(testData.phone)
      await this.streetInput.fill(testData.street)
      await this.zipCodeInput.fill(testData.zipCode)
      await this.submitRegisterBtn.click()
    }
}