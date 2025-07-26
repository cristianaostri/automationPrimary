describe('Iniciando login - Resolución definitiva del 415', () => {
    let authToken;

    it('Debería logearme con usuario con Content-Type exacto del front-end', () => {
        cy.request({
            method: 'POST',
            url: 'https://authapi.oneclearing.testing.primary/api/v1/Users/token',
            form: true,
            body: {
                username: 'cris',
                password: 'cris',
                application: 'OneClearing'
            },
            failOnStatusCode: false // Deja esto para depuración, para que puedas ver la respuesta si aún da 415
        })
        .then(response => {
            cy.log('Respuesta COMPLETA de la API:', JSON.stringify(response, null, 2)); // Loguea la respuesta para inspección
            expect(response.status).to.eq(200); // Esta es la aserción que esperamos que pase
            expect(response.body).to.have.property('access_token');
            authToken = response.body.access_token;
            cy.log(`Token obtenido: ${authToken}`);
        });
    });
});
