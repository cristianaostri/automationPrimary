# Proyecto de Testing con Cypress

Este proyecto utiliza **Cypress** para pruebas automatizadas de base de datos, API y frontend, distribuidas en tres ambientes diferentes.

## 🚀 Comenzando

### 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/nombre-del-repo.git
cd nombre-del-repo
```

### 2. Crear una nueva rama

```bash
git checkout -b nombre-de-tu-rama
```

### 3. Descargar dependencias

```bash
npm install 

Existen 3 dependencias:  

"devDependencies": {
        "cypress": "^14.5.2",
        "json-server": "^1.0.0-beta.3",
        "prettier": "^3.6.2"
      }

Estas dependencias se descargarán automáticamente al ejecutar `npm install`, ya que están definidas en el archivo `package.json` del proyecto. No es necesario instalarlas manualmente.

### 4. Hacer cambios y pushear

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin nombre-de-tu-rama
```

### 5. Actualizar tu rama (pull)

```bash
git pull origin main
```

## 🏗️ Estructura del Proyecto

- **/cypress**: Contiene los tests automatizados.
- **/cypress/integration**: Pruebas separadas por tipo (DB, API, Frontend).
- **/cypress/support**: Utilidades y comandos personalizados.

## 🌎 Ambientes

El proyecto está configurado para ejecutarse en **3 ambientes** distintos (por ejemplo: desarrollo, staging y producción). Puedes seleccionar el ambiente modificando las variables en el archivo `cypress.config.js` o usando variables de entorno.

## 🧪 Correr Cypress

### Interfaz Gráfica

```bash
npx cypress open
```

### Modo Headless

```bash
npx cypress open
Si querés abrirlo ya con el ambiente, por ejemplo con el ambiente qa: npx cypress open --env CYPRESS_ENV=qa
```

## 📦 Pruebas Incluidas

- **Base de Datos**: Validación de datos y consistencia.
- **API**: Pruebas de endpoints y respuestas.
- **Frontend**: Pruebas de UI y flujos de usuario.

---

¡Contribuciones y sugerencias son bienvenidas!
