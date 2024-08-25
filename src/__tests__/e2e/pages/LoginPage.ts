import type { Page } from "@playwright/test";

export default class LoginPage {
  readonly page: Page;
  public url = "http://localhost:3000";

  constructor(page: Page, url?: string) {
    this.page = page;
    if (url) this.url = url;
  }

  public async navToLogin() {
    await this.page.goto(this.url);
    const loginButton = await this.page.getByRole("button", {
      name: "LoginButton",
    });
    await loginButton.click();
    await this.page.waitForURL((url) => url !== new URL(this.url)); // change pages
  }

  public async inputLoginCredentials({
    email,
    pass,
  }: {
    email: string;
    pass: string;
  }) {
    const emailAddressField = await this.page.getByLabel("Email address");
    await emailAddressField.click();
    await emailAddressField.fill(email);
    await this.page.getByRole("button", { name: "Continue" }).click();

    const passField = await this.page.getByLabel("Password");
    await passField.click();
    await passField.fill(pass);

    await this.page.getByRole("button", { name: "Continue" }).click();
    await this.page.waitForURL(`${this.url}/app`);
  }
}
