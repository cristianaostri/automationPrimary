it('Debería poder conectarse a la DB y ejecutar un SELECT * a la tabla Caratula', () => {
    // Define la query SQL
    const query = `SELECT TOP 500 * FROM OneClearing_Entregas.Caratula.Caratula c;`; // Limitamos a 500 por si hay muchos registros

    // Llama a la tarea de Cypress para ejecutar la query en la DB
    cy.task('queryDb', query)
      .then(result => {
          cy.log('Resultado de la Base de Datos:', JSON.stringify(result, null, 2));

          // Aserciones para validar el resultado de la DB
          expect(result).to.be.an('array', 'El resultado de la DB debe ser un array');
          
          // Si esperas que haya registros, puedes verificar la longitud
          // expect(result).to.have.length.of.at.least(0); // Si puede estar vacía
          // expect(result).to.have.length.of.at.least(1); // Si esperas al menos 1 registro

          // Si esperas que los registros tengan ciertas propiedades
          if (result.length > 0) {
              expect(result[0]).to.have.property('CaratulaNumero'); // Asegura que la columna existe
              expect(result[0].CaratulaNumero).to.be.a('number'); // Verifica el tipo de dato
              // Puedes agregar más aserciones sobre las propiedades de los registros devueltos
              // expect(result[0]).to.have.property('fechaCreacion');
          }
      });
});
