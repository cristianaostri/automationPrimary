

describe('Tests for another module', () => {
  beforeEach(() => {
    // Obtén las credenciales de las variables de entorno
    console.log('llegué hasta acá', Cypress.env('frontendUser'))
    const username = Cypress.env('frontendUser');
    const password = Cypress.env('frontendPassword');
    console.log('Username para login:', username);
    console.log('Password para login:', password);
    cy.login(username, password); // Llama a tu comando personalizado
  });

  it('Prueba qa', () => {
    cy.contains('button', 'Ver carátulas').click();
    cy.url().should('include', '/delivery-offer/covers'); // O la URL esperada
    cy.get('.coversHeader_title__EYfhl').should('contain', 'Carátulas'); 
  });
});