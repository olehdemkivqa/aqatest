import { test } from '@playwright/test'
import { RegisterPage } from '../page-object/RegisterPage'
import { LoginPage } from '../page-object/LoginPage'
import { newUser1 } from '../data/testData'
import { cardData } from '../data/testData'
import { CatalogPage } from '../page-object/CatalogPage'
import { BasketPage } from '../page-object/BasketPage'
import { CheckoutPage } from '../page-object/CheckoutPage'
import { MyAccountPage } from '../page-object/MyAccountPage'
import { expect } from '@playwright/test'

test.setTimeout(50 * 1000)

test('Create user login, order 2 items, payment', async ({ page }) => {
    const registerPage = new RegisterPage(page)
    const loginPage = new LoginPage(page)
    const catalogPage = new CatalogPage(page)
    const checkoutPage = new CheckoutPage(page)
    const myAccount = new MyAccountPage(page)
    const basketPage = new BasketPage(page)

    await registerPage.openLoginPage()
    await registerPage.fillRegistrationForm(newUser1)
    await loginPage.login(newUser1.email, newUser1.password)
    const items = await catalogPage.selectProduct()

    await expect(catalogPage.basketCount).toBeVisible()
    await expect(catalogPage.basketCount).toContainText('2', { timeout: 3000 })

    await catalogPage.goToBasket()

    await expect(basketPage.firstProductItem).toHaveText(items.secondProduct.name)
    await expect(basketPage.secondProductItem).toHaveText(items.firstProduct.name)
    await expect(basketPage.firstItemPrice).toHaveText(items.secondProduct.price)
    await expect(basketPage.secondItemPrice).toHaveText(items.firstProduct.price)

    const firstProductPriceNumber = Number((await basketPage.firstItemPrice.innerText()).replace(/\D/g, ''))
    const secondProductItem = Number((await basketPage.secondItemPrice.innerText()).replace(/\D/g, ''))
    const totalNumber = parseInt((await basketPage.totalPrice.innerText()).replace(/[^\d.]/g, ''), 10)
    expect(totalNumber).toBe(firstProductPriceNumber + secondProductItem)

    await basketPage.checkTotalPrice()

    await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV)

    await expect(checkoutPage.successOrder).toBeVisible({ timeout: 9000 })
    await expect(checkoutPage.page).toHaveURL('/checkout')

    await checkoutPage.goToMyAccount()
    await expect(myAccount.page).toHaveURL('/account')

    const totalPrice = Number(items.firstProduct.price.replace('$', '')) + Number(items.secondProduct.price.replace('$', ''))
    await expect(myAccount.totalAmountField).toContainText(`${totalPrice}`)

    await expect(myAccount.items.first()).toBeVisible()
    await expect(myAccount.items.last()).toBeVisible()
    await expect(myAccount.logoutButton).toBeEnabled()

    await myAccount.logout()
})