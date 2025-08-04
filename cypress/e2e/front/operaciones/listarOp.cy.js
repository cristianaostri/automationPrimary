// La importación debe ser sin llaves si la clase se exporta con 'export default'
import CambioParametrosEntrega from "../../../support/page-objects/front/cambioParametrosEntrega";
import SeleccionarOperacion from "../../../support/page-objects/front/operaciones/seleccionarOp"; 

// Ahora declaras la instancia de la clase, y no hay conflicto de nombre
const cambiarParametroHora = new CambioParametrosEntrega();
const seleccionarOperacion = new SeleccionarOperacion();

const username = Cypress.env('frontendUser');
const password = Cypress.env('frontendPassword');

describe('Crear una oe', () => {
    it('Como agente quiero crear una oe de futuro', () => {
        // Hacemos login
        cy.login(username, password);
        seleccionarOperacion.seleccionarOperacion(); 
        if (cambiarParametroHora.getModat().should('be.exist')){
            cy.log("No estás dentro del horario de entrega");
            cambiarParametroHora.cambiarParametroHora();
    }   
        else{
            cy.get('button[data-testid="list-item-btn"]').contains('Primario').click();
            }
        seleccionarOperacion.seleccionarOperacion(); 
        
    });
});



        

        
        
