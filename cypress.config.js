const { defineConfig } = require("cypress");

module.exports = defineConfig({
    blockHosts: ["*.zopim.com", "*.zendesk.com", "*.zdassets.com"],
    downloadsFolder: "downloads",
    fixturesFolder: "fixtures",
    screenshotsFolder: "screenshots",
    videosFolder: "videos",
    numTestsKeptInMemory: 20,
    viewportHeight: 720,
    viewportWidth: 1280,
    chromeWebSecurity: false,
    retries: 1,
    pageLoadTimeout: 60 * 1000,
    requestTimeout: 10000,
    e2e: {
      setupNodeEvents(on, config) {
    },
      baseUrl: "https://beautifulslides-staging.appspot.com",
      testIsolation: false
    },
});
