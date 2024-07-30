import { test, expect } from '@/__tests__/e2e/fixtures/base-fixture'

test.describe("test user auth flow to adding paycheck to adding transaction to logging out", () => {
    test('should login, add paycheck, add transaction and logout', async ({ page, loginPage, userCredentials }) => {
        await loginPage.navToLogin()
        await loginPage.inputLoginCredentials(userCredentials)

        await expect(page.getByRole('heading', { name: userCredentials.email })).toBeDefined()
        await expect(page.getByRole('heading', { name: 'Welcome,' })).toBeDefined()
        await expect(page.getByRole('heading', { name: 'test@test.com' })).toBeDefined()

        const getStartedBtn = await page.getByRole('button', { name: 'Get Started' })
        await expect(getStartedBtn).toBeDefined()
        await getStartedBtn.click()

        await expect(page.getByRole('heading', { name: 'Add Paycheck' }))
        const inputField = await page.getByRole('heading', { name: 'Add Paycheck' })
        await inputField.click()
        await inputField.fill('1000')
        await page.getByRole('button', { name: 'Submit' }).click()
        await expect(page.getByText('$ 1,000.00'))
    })
})
