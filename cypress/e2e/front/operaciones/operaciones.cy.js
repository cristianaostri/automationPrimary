describe('Entrando a Operaciones', () => {
    const oneClearingApiUrl = Cypress.env('mainApiUrl'); 
    before(() => {
        
        const username = Cypress.env('frontendUser');
        const password = Cypress.env('frontendPassword');
        cy.login(username, password); // Llama a tu comando personalizado
        });
    it('Debería cargar la página de Operaciones correctamente', () => {
        cy.get('button.sidebar-button').contains('Oferta de entrega').click();
        cy.contains('.sidebar-button-label', 'Operaciones').click();
        cy.url().should('include', '/delivery-offer/operations'); // Verifica que la URL sea la correcta

        // Validar la presencia de elementos clave de la GUI
        cy.get('.operationsDataGridHeader_title__7FFW_').should('contain', 'Operaciones para entrega'); // Título de la sección
        cy.get('.dataGridTable').should('be.visible'); // Verificar que la tabla esté visible

        // Validar que la tabla tenga al menos una fila o que el mensaje de "no hay datos" aparezca si es el caso
        cy.get('.dataGridTable').should('have.length.at.least', 1);
            // .or('contain', 'No hay operaciones para mostrar'); // Ajusta el selector y el mensaje según tu aplicación

        // Validar los encabezados de la tabla
        cy.get('.dx-datagrid-headers')
            .find('.dx-datagrid-text-content')
            .should('contain', 'Fecha');       
        cy.get('[data-testid="data-grid-header-counter"]').should('contain', 'Total de operaciones');
        
       
   
        // Consideraciones de Accesibilidad (ejemplo básico)
        // cy.checkA11y(); // Si tienes Cypress-axe integrado
    });
});

