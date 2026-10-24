# ComicStore_APIRest
Trabajo en clase para la conxion de apis, con mongo db como Base de datos


# ComicStore REST API

API RESTful desarrollada con Node.js, Express y MongoDB Atlas para la gestión de autores y cómics.

## Tecnologías empleadas
* **Node.js** & **Express**
* **MongoDB Atlas** (Base de datos NoSQL en la nube)
* **Mongoose** (ODM para modelado de datos y relaciones mediante `ObjectId` / `.populate()`)
* **Dotenv** & **Cors**

##  Endpoints disponibles

### Autores (`/api/authors`)
* `GET /api/authors` - Obtener todos los autores
* `GET /api/authors/:id` - Obtener un autor por ID
* `POST /api/authors` - Crear un nuevo autor
* `PUT /api/authors/:id` - Actualizar un autor existente
* `DELETE /api/authors/:id` - Eliminar un autor

### Cómics (`/api/comics`)
* `GET /api/comics` - Obtener todos los cómics (incluye datos del autor poblados)
* `GET /api/comics/:id` - Obtener un cómic por ID
* `POST /api/comics` - Crear un nuevo cómic
* `PUT /api/comics/:id` - Actualizar un cómic existente
* `DELETE /api/comics/:id` - Eliminar un cómic

## Instalación y ejecución local
1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Configurar el archivo `.env` con la variable `MONGO_URI`.
4. Iniciar en desarrollo: `npx nodemon server.js`.