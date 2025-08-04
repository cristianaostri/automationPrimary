class CambioParametrosEntrega {
  getModat() {
    return cy.get('.button-module_buttonLabel__D2nwC');
  }

  cambiarParametroHora() {
    // Maneja el modal de forma condicional y robusta.
    // Usar cy.get('body').find(...) no falla si el elemento no existe.
    cy.get('body').then(($body) => {
      // Si el modal con el botón 'Aceptar' está presente...
      if ($body.find('.button-module_buttonLabel__D2nwC:contains("Aceptar")').length) {
        cy.get('.button-module_buttonLabel__D2nwC')
          .contains('Aceptar')
          .should('be.visible')
          .click();
        cy.log("Modal de 'Fuera de horario' aceptado.");
      } else {
        // Si no está presente, simplemente loguea y continúa.
        cy.log("El modal de 'Fuera de horario' no apareció.");
      }
    });

    // A partir de aquí, el flujo es lineal sin importar si el modal apareció.
    cy.get('.sidebar-button-label').contains('Parámetros').click();
    cy.get('.parameters_moduleLabel__PrDCO').contains('Ofertas de entregas').click();
    cy.get('.menuWithTabs_tabItem__PhMtL').contains('Horario').click();
    cy.get('[data-testid="parameters-button-edit-tooltip"]').find('.button-module_buttonIcon__UuuuL').first().click();

    // Calcular la nueva hora
    const now = new Date();
    const hoursToAdd = 2;
    let newHour = now.getHours() + hoursToAdd;
    if (newHour > 23) {
      newHour = 23;
    }
    const formattedHour = newHour.toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeToEnter = `${formattedHour}:${minutes}`;
    cy.log(`Intentando ingresar la hora: ${timeToEnter}`);

    // Interactuar con el input de hora
    cy.get('.dx-texteditor-input-container')
      .find('.dx-texteditor-input')
      .first()
      .click()
      .clear()
      .type(timeToEnter)
      .trigger('change'); // trigger('change') es clave para inputs de librerías como DevExtreme.

    // Guardar cambios
    cy.get('[data-testid="parameters-button-save-tooltip"]').first().click();
    
    // Verificación del toast
    cy.get('.toast-module_toast__l8YXq')
      .should('be.exist') // Usamos 'be.visible' para esperar a que aparezca.
      .then(($toast) => {
        cy.log("Hay un casamiento abierto");
        // cy.wrap($toast).should('not.exist'); // Si el toast desaparece solo, esta línea valida su desaparición.
      });
  }
}

export default CambioParametrosEntrega;