import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage'

interface UserCredentials {
    email: string;
    pass: string;
}

type BaseFixtures = {
    loginPage: LoginPage
    userCredentials: UserCredentials
}

export const test = base.extend<BaseFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },

    userCredentials: async ({ }, use) => {
        const email = process.env.TEST_USER || 'missing'
        const pass = process.env.TEST_PASS || 'missing'

        expect(email).not.toBe('missing')
        expect(email.length).toBeGreaterThan(0)
        expect(pass).not.toBe('missing')
        expect(pass.length).toBeGreaterThan(0)

        await use({ email, pass })
    }

})

export { expect } from '@playwright/test';


