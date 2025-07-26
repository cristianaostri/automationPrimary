const { defineConfig } = require("cypress");
const path = require('path'); // Si lo usas
const sql = require('mssql');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const environment = process.env.CYPRESS_ENV || 'qa'; // Por defecto a 'qa'
      try {
        const envConfig = require(`${config.projectRoot}/cypress/support/environments/${environment}.js`);        // Merge envConfig con la configuración existente de Cypress.env
        console.log(`Contenido cargado de cypress/support/environments/${environment}.js:`, envConfig);
        config.env = { ...config.env, ...envConfig };
        console.log('config.env DESPUÉS del merge:', config.env);
      } catch (e) {
        console.warn(`No se encontró o hubo un error al cargar el archivo de configuración para el ambiente: ${environment}.`);
        console.warn('Detalle del error:', e.message); // Muestra el mensaje de error de require
      }
          // --- CONFIGURACIÓN DE LA BASE DE DATOS Y TAREAS (cy.task) ---

      // Definición de la configuración de la conexión a SQL Server
      // ¡Ahora usando las variables cargadas desde config.env (tu archivo qa.js)!
      const dbConfig = {
        user: config.env.dbOCuser,       // 'sa' desde qa.js
        password: config.env.dbOCpassword,  // 'clearingPrimary1+' desde qa.js
        server: '192.168.139.161',       // Del setup previo, si es estático, déjalo aquí
        port: 1433,                      // Del setup previo, si es estático, déjalo aquí
        database: config.env.dbOneClearing, // 'OneClearing_Entregas' desde qa.js
        options: {
          encrypt: false,
          trustServerCertificate: false
        }
      };

      // Mensaje de log para verificar la config (sin la contraseña)
      console.log('[DB Config] Conectando a:', {
        server: dbConfig.server,
        port: dbConfig.port,
        database: dbConfig.database,
        user: dbConfig.user,
        encrypt: dbConfig.options.encrypt,
        trustServerCertificate: dbConfig.options.trustServerCertificate
      });


      // Registrar tareas (tasks) de Cypress para interactuar con la DB
      // (El código de las tareas queryDb, insertIntoDb, clearTable permanece igual)
      on('task', {
        async queryDb(query) {
          try {
            await sql.connect(dbConfig);
            const request = new sql.Request();
            const result = await request.query(query);
            console.log(`[DB Task] Query: "${query.substring(0, 100)}..." - Filas afectadas/registros: ${result.rowsAffected ? result.rowsAffected[0] : (result.recordset ? result.recordset.length : 'N/A')}`);
            return result.recordset;

          } catch (err) {
            console.error('[DB Task] ERROR al ejecutar query en DB:', err.message);
            throw new Error(`Error en tarea de DB: ${err.message}`);
          } finally {
            if (sql.connected) {
                sql.close();
            }
          }
        },

        async insertIntoDb({ tableName, data }) {
          try {
            await sql.connect(dbConfig);
            const request = new sql.Request();
            const columns = Object.keys(data).join(', ');
            const values = Object.values(data).map(val => {
              if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
              if (val === null) return 'NULL';
              if (val instanceof Date) return `'${val.toISOString()}'`;
              return val;
            }).join(', ');
            
            const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values}); SELECT SCOPE_IDENTITY() as id;`;
            const result = await request.query(query);
            console.log(`[DB Task] Insertado en ${tableName}.`);
            return result.recordset[0].id;
          } catch (err) {
            console.error('[DB Task] ERROR al insertar en DB:', err.message);
            throw new Error(`Error en tarea de DB: ${err.message}. Data: ${JSON.stringify(data)}`);
          } finally {
             if (sql.connected) {
                sql.close();
            }
          }
        },

        async clearTable(tableName) {
            try {
              await sql.connect(dbConfig);
              const request = new sql.Request();
              const query = `DELETE FROM ${tableName};`;
              await request.query(query);
              console.log(`[DB Task] Tabla ${tableName} limpiada.`);
              return `Tabla ${tableName} limpia.`;
            } catch (err) {
              console.error('[DB Task] ERROR al limpiar tabla en DB:', err.message);
              throw new Error(`Error en tarea de DB: ${err.message}. Tabla: ${tableName}`);
            } finally {
              if (sql.connected) {
                sql.close();
              }
            }
        }
      });
     return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: [
      "cypress/e2e/getting-started/*.js",
      "cypress/e2e/advanced-examples/*.js",
    ],
    
  },
});
