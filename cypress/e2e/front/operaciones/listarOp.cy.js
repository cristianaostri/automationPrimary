// La importación debe ser sin llaves si la clase se exporta con 'export default'
import CambioParametrosEntrega from "../../../support/page-objects/front/cambioParametrosEntrega";
import SeleccionarOperacion from "../../../support/page-objects/front/operaciones/seleccionarOp"; 

// Ahora declaras la instancia de la clase, y no hay conflicto de nombre
const cambiarParametroHora = new CambioParametrosEntrega();
const seleccionarOperacion = new SeleccionarOperacion();

const username = Cypress.env('frontendUser');
const password = Cypress.env('frontendPassword');

describe('Crear una oe', (entregador='Secundario', anioCosecha= "2025 - 2026") => {
    // anioCosecha puede ser 2023 - 2024 , 2024 - 2025, 2025 - 2026
    it('Como agente quiero crear una oe de futuro', () => {
        // Hacemos login
        cy.login(username, password);
        seleccionarOperacion.seleccionarOperacion(); 
        if (cambiarParametroHora.lenght == 1){
            cy.log("No estás dentro del horario de entrega");
            cambiarParametroHora.cambiarParametroHora();
    }   
        else{
            //eligo tipo de entregador
            cy.get('[placeholder="Seleccione el tipo de entregador"]').click();
            cy.get('button[data-testid="list-item-btn"]').contains(`${entregador}`).click();

            //eligo el año de cosecha
            cy.get('.inputSingleMode-module_input__v179d').click()
            cy.get('button[data-testid="list-item-btn"]').contains(`${anioCosecha}`).click();

            //Selecciono en el botón siguiente
            
            cy.get('button.button-module_primary__vK3U-').contains("Siguiente").click();

            }
        seleccionarOperacion.seleccionarOperacion(); 
        cy.get(`li[title=${entregador}]`).click();

    });
});



        

        
        
