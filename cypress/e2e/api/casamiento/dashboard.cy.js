describe('API Tests para Casamiento/Dashboard', () => {

    before(() => {
        // Llama al comando personalizado para loguearse por API y obtener el token
        cy.apiLogin();
        // El token se guardará automáticamente en Cypress.env('accessToken')
    });

    it('Debería obtener los datos del Dashboard de Casamiento', () => {
        // Recuperar el token de la variable de entorno
        const accessToken = Cypress.env('accessToken');
        const oneClearingApiUrl = Cypress.env('mainApiUrl'); // Desde cypress.config.js
        // Asegurarse de que el token existe
        expect(accessToken).to.not.be.undefined;
        expect(accessToken).to.be.a('string').and.not.be.empty;

        // Realizar la petición GET al Dashboard de Casamiento, usando el token
        cy.request({
            method: 'GET',
            url: `${oneClearingApiUrl}/Casamiento/Dashboard`, // URL completa
            headers: {
                'Authorization': `Bearer ${accessToken}` // ¡Autenticación con el token!
            },
            failOnStatusCode: false // Deja esto en false para depurar 4xx/5xx, o true para que falle el test
        }).then(response => {
            console.log('Respuesta del Dashboard de Casamiento:', JSON.stringify(response.body, null, 2));
            expect(response.status).to.eq(200);
            console.log(response)
            expect(response.body).to.have.all.keys(
                'fecha',
                'estadoCasamiento',
                'totalVolumen',
                'totalItems',
                'habilitarEjecucion',
                'horaEjecucion',
                'pendientesPrecioAjuste',
                'cards'
            );
            
        });
    });

});