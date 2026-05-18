import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { LoginPage } from "../pages/LoginPage.ts";

Given("ich öffne die Saucedemo Login-Seite", async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open();
});

When(
  "ich mich mit Benutzername {string} und Passwort {string} einlogge",
  async function (this: CustomWorld, username: string, password: string) {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(username, password);
  }
);

Then("sehe ich die Produktübersicht", async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.verifyProductsPage();
});