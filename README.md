
# Documentación tecnica

## Estructura del proyecto
```
┣ 📂.docker
┃ ┗ 📜Dockerfile.dev
┣ 📂src
┃ ┣ 📂config
┃ ┃ ┣ 📜database.js
┃ ┃ ┣ 📜envs.js
┃ ┃ ┗ 📜middlewares.js
┃ ┣ 📂controllers
┃ ┃ ┣ 📜employee-controller.js
┃ ┃ ┣ 📜request-controller.js
┃ ┃ ┗ 📜user-controller.js
┃ ┣ 📂middlewares
┃ ┃ ┗ 📜auth-middleware.js
┃ ┣ 📂migrations
┃ ┃ ┣ 📜20241205225059_create_employees_table.js
┃ ┃ ┣ 📜20241205225101_create_requests_table.js
┃ ┃ ┗ 📜20241206173037_create_users_table.js
┃ ┣ 📂repositories
┃ ┃ ┣ 📜employee-repository.js
┃ ┃ ┣ 📜request-repository.js
┃ ┃ ┗ 📜user-repository.js
┃ ┣ 📂routes
┃ ┃ ┣ 📜api-routes.js
┃ ┃ ┣ 📜employee-routes.js
┃ ┃ ┣ 📜request-routes.js
┃ ┃ ┗ 📜user-routes.js
┃ ┣ 📂services
┃ ┃ ┣ 📜employee-service.js
┃ ┃ ┣ 📜request-service.js
┃ ┃ ┗ 📜user-service.js
┃ ┗ 📂utils
┃   ┣ 📂response
┃   ┃ ┗ 📜response.js
┃   ┗ 📂validations
┃     ┣ 📜employee-validation.js
┃     ┣ 📜pagination-validation.js
┃     ┗ 📜request-validation.js
┣ 📂tests
┃ ┣ 📜auth.spec.js
┃ ┣ 📜employees.spec.js
┃ ┗ 📜request.spec.js
┣ 📜.dockerignore
┣ 📜.env
┣ 📜.env-example
┣ 📜.gitignore
┣ 📜eden-sky-collection.json
┣ 📜docker-compose.dev.yml
┣ 📜jest.config.mjs
┣ 📜knexfile.js
┣ 📜package.json
┣ 📜pnpm-lock.yaml
┣ 📜README.md
┗ 📜server.js

```

## Requisitos previos

Antes de iniciar con la configuración del proyecto, asegúrate de cumplir con los siguientes requisitos:

  - Tener instalado Node.js en la versión 20 o superior
  - Tener una instancia activa de PostgreSQL en la versión 16.2. 
  - Copiar el archivo .env-example que se encuentra en la raíz del proyecto y renómbralo a .env
  - Ajusta los valores en el archivo .env de acuerdo a tu entorno, como los datos de conexión a la base de datos y otras variables importantes.

NOTA: Si se ejecutará con Docker, solo necesitas verificar que Docker esté instalado y modificar el archivo .env, ya que el proyecto configura automáticamente todo lo necesario para su ejecución.

## Instalación Backend
Para probar en local, (sin docker)

1. Instalar dependencias, ejecuta el siguiente comando para instalar todas las dependencias del proyecto:
```
pnpm install
```

2. Aplicar migraciones, Ejecuta este comando para crear las tablas necesarias en la base de datos mediante las migraciones:
``` 
pnpx knex migrate:latest
```

3. Iniciar el servidor, Puedes iniciar el servidor con cualquiera de los siguientes comandos:


Con Pnpm
```
pnpm dev
```
Con npm
```
 npm run dev  
```

## Levantar el proyecto con Docker

Si prefieres utilizar Docker para simplificar la ejecución del proyecto, sigue estos pasos:

### Requisitos previos
  - Tener Docker y Docker Compose(opcional) instalados en tu sistema.

### Pasos de ejecución

1. Construir la imagen, ejecuta el siguiente comando para construir la imagen del contenedor:
```
docker-compose -f docker-compose.dev.yml build
```
2. Levantar los contenedores 
```
docker-compose -f docker-compose.dev.yml up
```

## Crear nuevas tablas mediante migraciones
Si necesitas crear nuevas tablas, utiliza los siguientes comandos para generar los archivos de migración, ejemplo de las tablas existentes: 
```
pnpx knex migrate:make create_employees_table
pnpx knex migrate:make create_requests_table
pnpx knex migrate:make create_users_table
```
Estos comandos generarán archivos de migración en la carpeta correspondiente (migrations/), donde podrás definir la estructura de las tablas.


## Pruebas unitarias

### Notas importantes
 - Asegúrate de que el puerto por defecto del backend no esté en uso. Si tienes la aplicación corriendo mediante Docker, el contenedor ya ocupará el puerto, lo que puede causar fallos en las pruebas.
 - Verifica que la base de datos esté activa antes de ejecutar las pruebas.

### Ejecutar las pruebas
Para ejecutar las pruebas unitarias y de integración (usando Jest y Supertest), utiliza los siguientes comandos:
```
pnpm test auth.spec.js
pnpm test employees.spec.js
pnpm test request.spec.js
```

Cada comando ejecutará los tests definidos en los archivos especificados. Asegúrate de que las rutas de prueba sean correctas y estén configuradas para el entorno de desarrollo.

### Consideraciones adicionales
  - Docker: Si estás utilizando Docker para levantar la aplicación y la base de datos, verifica que los contenedores estén apagados antes de ejecutar las pruebas para evitar conflictos en los puertos.
  - Base de datos: Asegúrate de que las migraciones estén actualizadas antes de ejecutar las pruebas para evitar errores relacionados con esquemas de tablas.


## Ejecución en Postman

Para facilitar la ejecución y prueba de las APIs en Postman:

  - En la raíz del proyecto hay un archivo llamado ```eden-sky-collection.json```.
Importa este archivo en Postman para cargar todas las rutas y configuraciones del proyecto.
  - Ajusta las variables de entorno en Postman según tu configuración local o de Docker, variable ```{{URL}}```.