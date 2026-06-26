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

test.describe('E2E order flow', () => {

    test.beforeAll(async () => {
        console.log('beforeAll prepare test data')
        console.log('beforeAll generate user')
        console.log('beforeAll ready')
    })

    test.beforeEach(async () => {
        console.log('beforeEach preconditions')
    })

    test.afterEach(async ( {page}, testInfo ) => {
        if (testInfo.status !== testInfo.expectedStatus){
            console.log(`afterEach: test failed ${testInfo.title}`)

            await page.screenshot( {
                path: `test-results/${testInfo.title} --failed.png`,
                fullPage: true,
            })
        }
    })

    test.afterAll(async () => {
        console.log('afterAll cleanup test data')
    })

    test('Create user login, order 2 items, payment', async ({ page }) => {
    const registerPage = new RegisterPage(page)
    const loginPage = new LoginPage(page)
    const catalogPage = new CatalogPage(page)
    const checkoutPage = new CheckoutPage(page)
    const myAccount = new MyAccountPage(page)
    const basketPage = new BasketPage(page)

    let items: any;

    await test.step('Open Login page', async () => {
        await registerPage.openLoginPage()
    })

    await test.step('Register new user', async () => {
        await registerPage.fillRegistrationForm(newUser1)
    })

    await test.step('Login with created user', async () => {
        await loginPage.login(newUser1.email, newUser1.password)
    })

    await test.step('Select 2 items', async () => {
        items = await catalogPage.selectProduct()
    })

    await test.step('Verify basket counter(visible, qnt)', async () => {
        await expect(catalogPage.basketCount).toBeVisible()
        await expect(catalogPage.basketCount).toContainText('2', { timeout: 3000 })
    })

    await test.step('Go to basket', async () => {
        await catalogPage.goToBasket()
    })

    await test.step('Verify product details in basket', async () => {
        await expect(basketPage.firstProductItem).toHaveText(items.secondProduct.name)
        await expect(basketPage.secondProductItem).toHaveText(items.firstProduct.name)
        await expect(basketPage.firstItemPrice).toHaveText(items.secondProduct.price)
        await expect(basketPage.secondItemPrice).toHaveText(items.firstProduct.price)
    })

    await test.step('Verify total price', async () => {
        const firstProductPriceNumber = Number((await basketPage.firstItemPrice.innerText()).replace(/\D/g, ''))
        const secondProductItem = Number((await basketPage.secondItemPrice.innerText()).replace(/\D/g, ''))
        const totalNumber = parseInt((await basketPage.totalPrice.innerText()).replace(/[^\d.]/g, ''), 10)
        expect(totalNumber).toBe(firstProductPriceNumber + secondProductItem)
    })

    await test.step('Go to checkout page', async () => {
        await basketPage.goToCheckoutPage()
    })

    await test.step('Fill payment data and submit', async () => {
        await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV)
    })

    await test.step('Verify successful order', async () => {
        await expect(checkoutPage.successOrder).toBeVisible({ timeout: 9000 })
        await expect(checkoutPage.page).toHaveURL('/checkout')
    })

    await test.step('Go to my account', async () => {
        await checkoutPage.goToMyAccount()
        await expect(myAccount.page).toHaveURL('/account')
    })

    await test.step('Verify total amount in My Account page', async () => {
        const totalPrice = Number(items.firstProduct.price.replace('$', '')) + Number(items.secondProduct.price.replace('$', ''))
        await expect(myAccount.totalAmountField).toContainText(`${totalPrice}`)
    })

    await test.step('Verify items list', async () => {
        await expect(myAccount.items.first()).toBeVisible()
        await expect(myAccount.items.last()).toBeVisible()
        await expect(myAccount.logoutButton).toBeEnabled()
    })

    await test.step('Logout', async () => {
        await myAccount.logout()
    })
})
})