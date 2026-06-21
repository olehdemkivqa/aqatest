import { type Page, type Locator } from '@playwright/test'

export class CheckoutPage {
    readonly page: Page
    readonly cardNumberField: Locator
    readonly payNowBtn: Locator
    readonly cardDate: Locator
    readonly cardCVV: Locator
    readonly successOrder: Locator
    readonly myAccountBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.cardNumberField = page.getByPlaceholder('Card Number (16 digits)')
        this.payNowBtn = page.getByRole('button', { name: 'Pay Now' })
        this.cardDate = page.getByPlaceholder('MM/YY')
        this.cardCVV = page.getByPlaceholder('CVV (3 digits)')
        this.successOrder = page.locator('[id="checkout-success"]')
        this.myAccountBtn = page.locator('[href="/account"]')
    }

    async fillPaymentData(cardNumber: string, cardDate: string, cardCVV: string) {
        await this.cardNumberField.type(cardNumber, { delay: 100 })
        await this.cardNumberField.press('Enter')
        await this.cardDate.fill(cardDate)
        await this.cardCVV.fill(cardCVV)
        await this.payNowBtn.click()
    }

    async goToMyAccount() {
        await this.myAccountBtn.click()
    }
}