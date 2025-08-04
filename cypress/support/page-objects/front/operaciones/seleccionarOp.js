class SeleccionarOperacion {
    seleccionarOperacion() {
        // Ir a Oferta de entrega
        cy.get('button.sidebar-button').contains('Oferta de entrega').click();
        cy.contains('.sidebar-button-label', 'Operaciones').closest('button.sidebar-button').click();
        cy.url().should('include', '/delivery-offer/operations');

        // Validar filas de la tabla
        cy.get('.dataGridTable tbody tr.dx-data-row')
            .should('have.length.at.least', 1)
            .then(($rows) => {
                const numberOfRows = $rows.length;
                cy.log(`Número de filas en la tabla: ${numberOfRows / 2}`);
                expect(numberOfRows).to.equal(40); // validamos que haya un máximo de 20 op
            });

        // Seleccionar filtro Venta
        cy.get('div.contractTypesItems').contains('Venta').click();
        cy.get('.dx-checkbox').eq(2).click();
        cy.get('button:contains("Presentar oferta")').click();

        // Llamar a cambiarParametroHora
        
    }
}

export default SeleccionarOperacion;