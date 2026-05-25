import { chromium, Browser } from "playwright";

class BrowserManager {

  private static browser: Browser;

  static async getBrowser(): Promise<Browser> {

    if (!BrowserManager.browser) {

      BrowserManager.browser = await chromium.launch({
        headless: process.env.HEADLESS !== "false",
        slowMo: process.env.HEADLESS === "false" ? 1000 : 0,
        args: ["--start-maximized"]
      });

    }

    return BrowserManager.browser;
  }

  static async closeBrowser() {

    if (BrowserManager.browser) {

      await BrowserManager.browser.close();

    }
  }
}

export default BrowserManager;