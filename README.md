API REST HTTP CRUD - Backend de gestion de libros (http + cli)

## Stack Tecnológico

- Lenguaje de Programación: JavaScript
- Framework Web: Express.js
- Base de Datos: PostgreSQL
- Herramientas de Desarrollo: Visual Studio Code, Git, Postman
- Librerías y Dependencias: Sequelize, Body-parser, Yargs 
- Entorno de Desarrollo: Node.js
- Versiones: Node.js v16.14.2, Express.js v4.18.2

---

## Instrucciones para correr el proyecto de manera local

```bash
git clone https://github.com/EmilianoTosar/gestion_libros.git
cd gestion_libros
npm install
npm start
```
----

En el archivo app/config/db.config van cargados los datos de configuracion de la base de datos de Postgres a la que se desee conectar.

----

Para popular la base de datos:
```bash
node seeds.js
```

## HTTP Requests

| Método	| Urls              | Acción                 |
| ------- | ----------------- | ---------------------- |   
| GET	    | api/libros	      | trae todos los libros  |
| GET	    | api/libros/:id	  | trae libro por id      |
| POST	  | api/libros	      | agrega nuevo libro     |
| PUT	    | api/libros/:id	  | modifica libro por id  |
| DELETE	| api/libros/:id	  | borra libro por id     |
| DELETE	| api/libros	      | borra todos los libros |

---

## Métodos CLI 

``` bash
cd \cli-client
node cli-client.js comando --parametro
```

| Método	| Comando              | Acción                 |
| ------- | -------------------- | ---------------------- |   
| GET	    | findAll   	         | trae todos los libros  |
| GET	    | findById --id 	     | trae libro por id      |
| POST	  | create --campos	     | agrega nuevo libro     |
| PUT	    | update --id --campos | modifica libro por id  |
| DELETE	| delete --id	         | borra libro por id     |
| DELETE	| deleteAll	           | borra todos los libros |