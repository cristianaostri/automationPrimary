// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import loginPage from './page-objects/front/loginPage';


Cypress.Commands.add('login', (username, password) =>{
    loginPage.login(username, password);
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('cambia la contraseña'); // O el texto exacto
      return true; // Aceptar el popup
    });
    // Assertions after login
    cy.get('.dashboard_header__Sn37M') // Selecciona el div padre
    .find('.dashboard_title__lLi_2') // Busca el span dentro de ese div
    .should('contain', 'Dashboard de entregas');
    cy.wait(2000); 
})
Cypress.Commands.add('apiLogin', () => {
  // Obtener las credenciales y la URL base de las variables de entorno de Cypress
  const username = Cypress.env('apiUser'); // O 'apiUser' si usas credenciales distintas para API
  const password = Cypress.env('apiPassword'); // O 'apiPassword'
  const application = Cypress.env('apiApplication'); // Asegúrate de que esta variable exista
  const authApiBaseUrl = Cypress.env('authApiUrl'); // Asegúrate de que esta variable exista

  // Verificar que las variables no sean undefined antes de usarlas
  if (!username || !password || !application || !authApiBaseUrl) {
      throw new Error('Cypress environment variables for API login (frontendUser/apiUser, frontendPassword/apiPassword, apiApplication, authApiBaseUrl) are not defined. Please check cypress.config.js or your environment files.');
  }

  cy.log('Intentando login por API con:', { username, application, authApiBaseUrl });
  console.log(`${authApiBaseUrl}/Users/token`)
  // Realizar la petición POST al endpoint de token
  cy.request({
      method: 'POST',
      url: `${authApiBaseUrl}/Users/token`, // URL completa del endpoint de token
      form: true, // Para Content-Type: application/x-www-form-urlencoded
      body: {
          username: username,
          password: password,
          application: application
      },
      failOnStatusCode: true // Fallar el test si el status code no es 2xx
  })
  .then(response => {
      // Loguear la respuesta completa para depuración
      cy.log('Respuesta COMPLETA de la API de login:', JSON.stringify(response.body, null, 2));

      // Aserciones para asegurar que el login fue exitoso y el token se recibió
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('access_token');

      // Guardar el access_token en una variable de entorno de Cypress
      // para que esté disponible globalmente en otros tests y comandos
      Cypress.env('accessToken', response.body.access_token);
      console.log(`Token de acceso guardado en Cypress.env('accessToken'): ${response.body.access_token.substring(0, 30)}...`);

      // Opcional: También puedes devolver el token para encadenar en .then() si lo necesitas
      // return response.body.access_token;
  });

});
