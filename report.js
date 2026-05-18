const reporter = require("multiple-cucumber-html-reporter");

reporter.generate({
  jsonDir: "reports",
  reportPath: "reports/html",
  metadata: {
    browser: {
      name: "chromium"
    },
    device: "Local test machine",
    platform: {
      name: process.platform
    }
  },
  customData: {
    title: "Saucedemo Testreport",
    data: [
      { label: "Projekt", value: "Playwright + Cucumber + TypeScript" },
      { label: "Webseite", value: "https://www.saucedemo.com/" }
    ]
  }
});