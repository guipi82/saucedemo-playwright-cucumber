import { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status} from "@cucumber/cucumber";
import { chromium } from "playwright";
import { CustomWorld } from "./world.ts";
import fs from "fs";
import path from "path";

import BrowserManager from "./browserManager.ts";

setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
  await BrowserManager.getBrowser();
});

Before(async function (this: CustomWorld) {
  this.browser = await BrowserManager.getBrowser();

  this.context = await this.browser.newContext({
    viewport: null,
    recordVideo: {
      dir: "test-results/videos"
    }
  });
  await this.context.tracing.start({
    screenshots: true,
    snapshots: true
  });
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {

  //const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");
  const now = new Date();

  const timestamp =
    `${now.getFullYear()}-` +
    `${String(now.getMonth() + 1).padStart(2, "0")}-` +
    `${String(now.getDate()).padStart(2, "0")}_` +
    `${String(now.getHours()).padStart(2, "0")}-` +
    `${String(now.getMinutes()).padStart(2, "0")}-` +
    `${String(now.getSeconds()).padStart(2, "0")}` +
    `-${String(now.getMilliseconds()).padStart(3, "0")}`;

  const testCaseName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");
  const scenarioName = `${testCaseName}_${timestamp}`;

  const screenshotDir = "test-results/screenshots";
  //const traceDir = "test-results/traces";
  const videoDir = "test-results/videos";

  fs.mkdirSync(screenshotDir, { recursive: true });
  //fs.mkdirSync(traceDir, { recursive: true });
  fs.mkdirSync(videoDir, { recursive: true });


  if (scenario.result?.status === Status.FAILED) {

    await this.page.screenshot({
      path: `${screenshotDir}/${scenarioName}.png`,
      fullPage: true
    });
  
    /*await this.context.tracing.stop({
      path: `${traceDir}/${scenarioName}.zip`
    });*/
  } else {
    await this.context.tracing.stop();
  }

  const video = this.page.video();

  await this.page?.close();
  await this.context?.close();
  

  if (video) {

    const oldVideoPath = await video.path();
   
    const newVideoPath =
      path.join(videoDir, `${scenarioName}.webm`);

    fs.renameSync(oldVideoPath, newVideoPath);

  }

});

AfterAll(async function () {
  await BrowserManager.closeBrowser();
});