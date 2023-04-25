const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "vs59ef",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
