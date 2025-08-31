const { defineConfig } = require("cypress");

module.exports = defineConfig({
  blockHosts: ["*.zopim.com", "*.zendesk.com", "*.zdassets.com"],
  downloadsFolder: "downloads",
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "screenshots",
  videosFolder: "videos",
  numTestsKeptInMemory: 20,
  viewportHeight: 1080,
  viewportWidth: 1920,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 0
  },
  pageLoadTimeout: 60 * 1000,
  requestTimeout: 10000,
  e2e: {
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: process.env.CYPRESS_BASE_URL || "https://beautifulslides-staging.appspot.com",
    testIsolation: false
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Report',
    embeddedScreenshots: true,
    inlineAssets: true
  }
});
