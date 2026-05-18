import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { CustomWorld } from "./world.ts";

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({
    //headless: false, // Set to true for headless mode
    headless: process.env.HEADLESS !== "false", // Use environment variable to control headless mode
    slowMo: 1000, // Slow down actions for better visibility
    args: ["--start-maximized"], // Start the browser maximized
  });

  this.context = await this.browser.newContext({viewport: null});
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld) {
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});