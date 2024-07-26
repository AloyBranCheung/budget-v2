import { test, expect } from '@/__tests__/e2e/fixtures/base-fixture'

test.describe("test user auth flow to adding paycheck to adding transaction to logging out", () => {
    test('should login, add paycheck, add transaction and logout', async ({ page, loginPage, userCredentials }) => {
        await loginPage.navToLogin()
        await loginPage.inputLoginCredentials(userCredentials)

        expect(page.getByRole('heading', { name: userCredentials.email }))
        expect(page.getByRole('heading', { name: 'Welcome,' }))
    })
})

