// cypress/support/environments/dev.js
module.exports = {
    //frontend
    baseUrl: 'https://app.oneclearing.dev.primary',
    //apis
    authApiUrl: 'https://authapi.oneclearing.dev.primary/api/v1',
    mainApiUrl: 'https://api.oneclearing.dev.primary/api/v1',
    // Credenciales
    frontendUser: 'cris',
    frontendPassword: 'cris',
    apiUser: 'cris',
    apiPassword: 'cris',
    apiApplication: 'OneClearing',
    // Otros
    featureFlagA: true,
    dataBaseName: 'DevDB'
  };