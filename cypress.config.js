const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.amazon.com.br', 
    supportFile: false,
    reporter: 'mochawesome', 
    reporterOptions: {
      reportDir: 'cypress/results', // Diretório onde os relatórios serão salvos
      overwrite: false,             // Não sobrescrever os relatórios anteriores
      html: false,                  
      json: true                    // Gerar relatório JSON
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});