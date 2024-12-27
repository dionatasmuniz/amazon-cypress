const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.amazon.com.br',
    supportFile: false,
    setupNodeEvents(on, config) {
      // Instala o mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    reporter: 'cypress-mochawesome-reporter', // Usa o mochawesome como reporter
    reporterOptions: {
      reportDir: 'cypress/results', // Diretorio onde os resultados serão salvos
      overwrite: false,
      html: false,
      json: true,
    },
  },
});
