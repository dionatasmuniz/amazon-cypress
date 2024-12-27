const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.amazon.com.br',
    supportFile: false,
    setupNodeEvents(on, config) {
      // Carregar o plugin do mochawesome
      require('cypress-mochawesome-reporter/plugin')(on); // Certifique-se de que o caminho está correto
    },
    reporter: 'cypress-mochawesome-reporter', // Usa o mochawesome como reporter
    reporterOptions: {
      reportDir: 'cypress/results', // Diretório onde os resultados serão salvos
      overwrite: false,
      html: true,
      json: false,
    },
  },
});
