cy.visit(Cypress.env('base_url')+ '/login');
cy.request('POST', Cypress.env('authApiUrl')+ '/Users/token');

//para credenciales
const username = Cypress.env('apiUser');
const password = Cypress.env('apiPassword');

// Para otros datos de configuración

