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

        await expect(page.getByRole('heading', { name: 'Add Paycheck' })).toBeVisible()
        const inputField = await page.getByPlaceholder('$')
        await inputField.click()
        await inputField.fill('1000')
        await page.getByRole('button', { name: 'Submit' }).click()

        await expect(page.getByText('$ 1,000.00')).toBeVisible()

        await page.getByRole('img', { name: 'add-icon' }).click()

        const nameInputField = await page.getByPlaceholder('Name of transaction')
        await expect(nameInputField).toBeVisible()
        await nameInputField.click()
        await nameInputField.fill('test name')

        const amountInputField = await page.getByPlaceholder('$')
        await amountInputField.click()
        await amountInputField.fill('500')

        const tagInputField = await page.getByRole('option', { name: 'Food' })
        await tagInputField.click()

        await page.getByRole('button', { name: 'Save' }).click()

        await expect(page.getByText('$ 500.00')).toBeVisible()
        await expect(page.getByText('$500.00 / $500.00 spent')).toBeVisible()
        await expect(page.getByText('$0.00 / $300.00 spent')).toBeVisible()
        await expect(page.getByText('$0.00 / $200.00 spent')).toBeVisible()


        await page.getByRole('button', { name: 'profile-icon' }).click()
        await page.getByText("Logout").click()

        await expect(page.getByText("Landing Page")).toBeVisible()
    })
})
