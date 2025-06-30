# TFG-GetAways

Este es el repositorio de "TFG-GetAways", una aplicación web diseñada para la evaluación de rutas de senderismo. Permite a los usuarios descubrir nuevas rutas, compartir sus experiencias y gestionar sus listas personales de senderismo.

## Tecnologías Utilizadas

El proyecto está construido con una pila de tecnologías moderna:

*   **Frontend:**
    *   **React:** Una librería de JavaScript para construir interfaces de usuario.
    *   **HTML/CSS:** Para estructurar y dar estilo a las páginas web.
    *   **React Router DOM:** Para el enrutamiento declarativo en la aplicación.
    *   **React Toastify:** Para mostrar notificaciones toast.
    *   **React Switch:** Para interruptores de palanca en la interfaz de usuario.
    *   **Axios:** Cliente HTTP basado en promesas para el navegador y Node.js.
*   **Backend:**
    *   **Node.js:** Un entorno de ejecución de JavaScript construido con el motor V8 de Chrome.
    *   **Express.js:** Un framework web rápido, minimalista y sin opiniones para Node.js.
    *   **JSON Web Tokens (JWT):** Para una autenticación de usuario segura y sin estado.
    *   **Bcrypt:** Para el hash de contraseñas.
    *   **Nodemailer:** Para el envío de correos electrónicos (por ejemplo, correos de bienvenida).
    *   **Express Validator:** Para la validación de entrada en el lado del servidor.
    *   **CORS:** Middleware para habilitar el Intercambio de Recursos de Origen Cruzado.
*   **Base de Datos:**
    *   **MySQL:** Un popular sistema de gestión de bases de datos relacionales de código abierto.

## Arquitectura

La aplicación sigue una arquitectura cliente-servidor:

*   **Frontend:** Una aplicación de una sola página (SPA) de React que interactúa con la API del backend.
*   **Backend:** Una API de Node.js Express que maneja la lógica de negocio, las interacciones con la base de datos y sirve datos al frontend.
*   **Base de Datos:** Una base de datos MySQL almacena todos los datos de la aplicación, incluyendo información de usuario, rutas de senderismo, comentarios y más.

## Despliegue

*   **Frontend:** 
    La aplicación frontend está desplegada en [Vercel](https://vercel.com/) y accesible en `https://get-aways.vercel.app`.
*   **Backend:** 
    La API del backend está desplegada en [Render](https://render.com/) y accesible a través de `process.env.REACT_APP_API_URL`.
*   **Base de Datos:** 
    La base de datos MySQL está alojada en [Clever Cloud](https://www.clever-cloud.com/). Los detalles de conexión se gestionan de forma segura a través de variables de entorno.

## Cómo Empezar Localmente

Para configurar y ejecutar el proyecto en tu máquina local, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone <url_del_repositorio>
    cd TFG-GetAways
    ```

2.  **Database Setup:**
    *   Asegúrate de tener un servidor MySQL en ejecución.
    *   Importa el archivo `getaways_db.sql` en tu instancia de MySQL para configurar el esquema de la base de datos y los datos iniciales.
    *   Configura los detalles de conexión de tu base de datos (host, usuario, contraseña, nombre de la base de datos) en el archivo `.env` del backend o directamente en `backend/src/db.js` (si no utilizas variables de entorno).

3.  **Configuración del Backend:**
    ```bash
    cd backend
    npm install
    npm start
    ```
    El servidor backend se ejecutará normalmente en `http://localhost:3306` (o el puerto especificado en `process.env.PORT`).

4.  **Configuración del Frontend:**
    ```bash
    cd frontend
    npm install
    npm start
    ```
    La aplicación frontend se ejecutará normalmente en `http://localhost:3000`.

## Scripts Disponibles (Frontend)

En el directorio `frontend`, puedes ejecutar:

*   `npm start`: Ejecuta la aplicación en modo de desarrollo.
*   `npm test`: Inicia el ejecutor de pruebas.
*   `npm run build`: Compila la aplicación para producción.

## Más Información

Para más información sobre React, Node.js, Express y MySQL, consulta su documentación oficial.
