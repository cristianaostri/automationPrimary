// cypress/support/environments/qa.js
module.exports = {
    baseUrl: 'https://app.oneclearing.uat.primary',
    authApiUrl: 'https://authapi.oneclearing.uat.primary/api/v1',
    mainApiUrl: 'https://api.oneclearing.uat.primary/api/v1',
    frontendUser: 'cris',
    frontendPassword: 'cris',
    apiUser: 'cris',
    apiPassword: 'cris',
    apiApplication: 'OneClearing',
    featureFlagA: false,
    dataBaseName: 'QADB'
  };