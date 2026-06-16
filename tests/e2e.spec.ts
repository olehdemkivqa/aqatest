import { test } from '@playwright/test'
import { RegisterPage } from '../page-object/RegisterPage'
import { LoginPage } from '../page-object/LoginPage'
import { newUser1 } from '../data/testData'
import { cardData } from '../data/testData'
import { CatalogPage } from '../page-object/CatalogPage'
import { BasketPage } from '../page-object/BasketPage'
import { CheckoutPage } from '../page-object/CheckoutPage'
import { MyAccountPage } from '../page-object/MyAccountPage'

test.setTimeout(50 * 1000)

test('test', async ({ page }) => {
    const registerPage = new RegisterPage(page)
    const loginPage = new LoginPage(page)
    const catalogPage = new CatalogPage(page)
    const checkoutPage = new CheckoutPage(page)
    const myAccount = new MyAccountPage(page)

    await registerPage.navigate()
    await registerPage.fillRegistrationForm(newUser1)

    await loginPage.login(newUser1.email, newUser1.password)

    await catalogPage.selectProduct()


    const basketPage = new BasketPage(page, catalogPage.tabletNameValue, catalogPage.coffeeMachineNameValue, catalogPage.tabletPriceValue, catalogPage.coffeeMachinePriceValue)
    await basketPage.compareProductDetails()
    await basketPage.checkTotalPrice()

    await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV)
    await checkoutPage.successOrderMessage()
    await checkoutPage.goToMyAccount()

    await myAccount.checkFinalOrder(catalogPage.tabletPriceValue, catalogPage.coffeeMachinePriceValue)
    await myAccount.checkTwoItems()
    await myAccount.logout()
})