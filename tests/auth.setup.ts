import { test } from '@playwright/test'
import { RegisterPage } from '../page-object/RegisterPage'
import { LoginPage } from '../page-object/LoginPage'
import { newUser1 } from '../data/testData'


test('setup: login and save storageState', async ({page, context}) => {
    const registerPage = new RegisterPage(page)
    const loginPage = new LoginPage(page)

    await test.step('Open Login page', async () => {
        await registerPage.openLoginPage()
    })

    await test.step('Register new user', async () => {
        await registerPage.fillRegistrationForm(newUser1)
    })

    await test.step('Login with created user', async () => {
        await loginPage.login(newUser1.email, newUser1.password)
    })

    await test.step('Save storage state', async () => {
        await context.storageState({path: 'data/storageState.json'})
    })
})