## Instalación

1. Para poder ejecutar la aplicación clone el repositorio o descargue los archivos.
2. Ubíquese dentro la carpeta raíz del proyecto.
3. Abra el emulador de terminal de su preferencia y ejecute el comando `npm install`.
4. Defina las variables de entorno
5. Ejecute el comando: `npm run start`.

#### Definiendo las variables de entorno

Ubique el archivo **example.env** en la raiz del proyecto y cambie el nombre del archivo a **.env**.
Seguido, defina las variables de entorno teniendo en cuenta las siguientes definiciones:

- ENCRYPTION_KEY: Llave con la que se encriptan las contraseñas de usuarios.
- TIRESIAS_DB_HOST: URL del servidor de la base de datos.
- TIRESIAS_DB_PORT: Puerto en el que se encuentra la base de datos. Por defecto es **3306**.
- TIRESIAS_DB_NAME: Nombre de la base de datos.
- TIRESIAS_DB_USER: Usuario de la base de datos.
- TIRESIAS_DB_PASSWORD: Contraseña del usuario de la base de datos.
- TIRESIAS_SESSION_TIME: Cuanto tiempo pasa antes que un token de autorización expire. Algunos ejemplos de formatos de tiempo aceptados son:
  - 2 minutes
  - 9.5m
  - 1h
  - 3 hours
  - 2.3d
  - 15 days
  - 2y
- TIRESIAS_JWT_KEY: Llave con la que se firman los tokens de autorización
- PORT: Puerto en el que corre la aplicación.
