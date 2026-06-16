import { expect } from '@playwright/test'

export class BasketPage {
    constructor(page, tabletNameValue, coffeeMachineNameValue, tabletPriceValue, coffeeMachinePriceValue) {
        this.page = page
        this.firstProductItem = page.locator('[id="cart-item-name-6"]')
        this.secondProductItem = page.locator('[id="cart-item-name-5"]')

        this.firstItemPrice = page.locator('[id="cart-item-price-6"]')
        this.secondItemPrice = page.locator('[id="cart-item-price-5"]')

        this.totalPrice = page.locator('[id="cart-total"]')

        this.checkoutButton = page.locator('[id="cart-checkout-button"]')

        this.removeFirstItemButton = page.locator('[id="cart-item-decrease-6"]')
        this.addFirstItemButton = page.locator('[id="cart-item-increase-6"]')

        this.tabletNameValue = tabletNameValue
        this.coffeeMachineNameValue = coffeeMachineNameValue
        this.tabletPriceValue = tabletPriceValue
        this.coffeeMachinePriceValue = coffeeMachinePriceValue
    }

    async compareProductDetails() {
        await expect(this.firstProductItem).toHaveText(this.coffeeMachineNameValue)
        await expect(this.secondProductItem).toHaveText(this.tabletNameValue)

        await expect(this.firstItemPrice).toHaveText(this.coffeeMachinePriceValue)
        await expect(this.secondItemPrice).toHaveText(this.tabletPriceValue)
    }
    
    async checkTotalPrice() {
        const firstProductPriceNumber = Number((await this.firstItemPrice.innerText()).replace(/\D/g, ''))
        const secondProductItem = Number((await this.secondItemPrice.innerText()).replace(/\D/g, ''))

        const totalNumber = parseInt((await this.totalPrice.innerText()).replace(/[^\d.]/g, ''), 10)
        expect(totalNumber).toBe(firstProductPriceNumber + secondProductItem)
        await this.checkoutButton.click()
    }
}