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

---

En el archivo app/config/db.config van cargados los datos de configuracion de la base de datos de Postgres a la que se desee conectar.

---

Para popular la base de datos:

```bash
node seeds.js
```

## HTTP Requests

### Traer una lista de libros

`GET /api/libros`

#### Parámetros de Consulta

- **page** (opcional): Número de página para la paginación. Por defecto: 1.
- **limit** (opcional): Número de elementos por página. Por defecto: 10.

#### Ejemplo de Uso

Para obtener la primera página con 10 libros:

`GET /api/libros`

Para obtener la segunda página con 5 libros por página:

`GET /api/libros?page=2&limit=5`

#### Respuesta

La respuesta será un objeto JSON que contiene la información de los libros en la página solicitada.

```json
{
  "message": "Devolviendo pagina 1 con 5 libros por pagina:"
  "libros": [
    {
      "id": 1,
      "isbn": "73524446452",
      "title": "El Señor de los Anillos",
      "author": "J.R.R. Tolkien",
      "price": "48",
      "publicationDate": "1975-09-22",
      "genre": "misterio",
      "createdAt": "2023-11-10T13:56:19.484Z",
      "updatedAt": "2023-11-10T13:56:19.484Z"
    },
    // ... otros libros ...
  ]
}
```

### Traer un solo libro

`GET /api/libros/:id`

#### Ejemplo de Uso

Para obtener el libro con id: 125.

`GET /api/libros/125`

#### Respuesta

La respuesta será un objeto JSON que contiene la información del libro solicitado.

```json
    {
      "id": 125,
      "isbn": "73524446452",
      "title": "El Señor de los Anillos",
      "author": "J.R.R. Tolkien",
      "price": "48",
      "publicationDate": "1975-09-22",
      "genre": "misterio",
      "createdAt": "2023-11-10T13:56:19.484Z",
      "updatedAt": "2023-11-10T13:56:19.484Z"
    },
```

### Crear un nuevo libro

`POST /api/libros/`

#### Datos Requeridos

- **isbn**: ISBN del libro (debe ser único).
- **title**: Título del libro.
- **author**: Autor del libro.
- **genre**: Género del libro (Las opciones válidas son: Misterio, Ciencia ficción, Romance, Drama, Aventura, Acción, Terror, Histórico, Biografía, Filosofía, Política, Negocios o Autoayuda').
- **price**: Precio del libro.
- **publicationDate**: Fecha de publicación del libro.

#### Ejemplo de Uso

Se pueden utilizar herramientas como [Postman](https://www.postman.com/) para realizar solicitudes POST de manera interactiva. Aquí hay un ejemplo utilizando Postman:

1. Abre Postman y crea una nueva solicitud POST.
2. Ingresa la URL: `localhost:3000/api/libros`.
3. Selecciona el tipo de contenido `application/json`.
4. En el cuerpo de la solicitud, proporciona los datos requeridos en formato JSON:

   ```json
   {
   	"title": "Nuevo Libro",
   	"author": "Autor Desconocido",
   	"genre": "misterio",
   	"price": 25,
   	"isbn": "1235646513",
   	"publicationDate": "1999/05/05"
   }
   ```

#### Respuesta

La respuesta será un objeto JSON que contiene la información del libro creado.

```json
    {
      "title": "Nuevo Libro",
      "author": "Autor Desconocido",
      "genre": "misterio",
      "price": 25,
      "isbn": "1235646513",
      "publicationDate": "1999/05/05",
      "createdAt": "2023-11-10T13:56:19.484Z",
      "updatedAt": "2023-11-10T13:56:19.484Z"
    },
```

### Actualizar un libro

`PATCH /api/libros/:id`

#### Datos Requeridos (solo es necesario ingresar los datos que se deseen actualizar).

- **isbn**: ISBN del libro (debe ser único).
- **title**: Título del libro.
- **author**: Autor del libro.
- **genre**: Género del libro (Las opciones válidas son: Misterio, Ciencia ficción, Romance, Drama, Aventura, Acción, Terror, Histórico, Biografía, Filosofía, Política, Negocios o Autoayuda').
- **price**: Precio del libro.
- **publicationDate**: Fecha de publicación del libro.

#### Ejemplo de Uso

Para actualizar un libro con id: 125.

Utilizando Postman:

1. Abre Postman y crea una nueva solicitud PATCH.
2. Ingresa la URL: `localhost:3000/api/libros/125`.
3. Selecciona el tipo de contenido `application/json`.
4. En el cuerpo de la solicitud, proporciona los datos que se deseen actualizar en formato JSON:

   ```json
   {
   	"price": 25,
   	"isbn": "1235646513",
   	"publicationDate": "1999/05/05"
   }
   ```

#### Respuesta

La respuesta será un objeto JSON que contiene la información del libro actualizado junto con un mensaje indicando que la operación fue correctamente realizada.

```json
    {
      "message": "Libro actualizado",
      "libro" : {
        "title": "Nuevo Libro",
        "author": "Autor Desconocido",
        "genre": "misterio",
        "price": 25,
        "isbn": "1235646513",
        "publicationDate": "1999/05/05",
        "createdAt": "2023-11-10T13:56:19.484Z",
        "updatedAt": "2023-11-10T13:56:19.484Z"
      }
    },
```

### Eliminar un libro

`DELETE /api/libros/:id`

#### Ejemplo de Uso

Para eliminar el libro con id: 125.

`DELETE /api/libros/125`

#### Respuesta

```json
{
	"message": "Libro \"Nuevo Libro\" borrado!"
}
```

---

## Métodos CLI

```bash
cd cli-client
```

### Traer una lista de libros

`node cli-client.js findAll`

#### Parámetros de Consulta

- **page** (opcional): Número de página para la paginación. Por defecto: 1.
- **limit** (opcional): Número de elementos por página. Por defecto: 10.

#### Ejemplo de Uso

Para obtener la primera página con 10 libros:

`node cli-client.js findAll`

Para obtener la segunda página con 5 libros por página:

`node cli-client.js findAll --page "2" --limit "5"`

#### Respuesta

La respuesta será mostrada en la consola.

```bash
  Devolviendo pagina 1 con 5 libros por pagina:
    {
      id: 1,
      isbn: "73524446452",
      title: "El Señor de los Anillos",
      author: "J.R.R. Tolkien",
      price: 48,
      publicationDate: "1975-09-22",
      genre: "misterio",
      createdAt: "2023-11-10T13:56:19.484Z",
      updatedAt: "2023-11-10T13:56:19.484Z"
    },
    // ... otros libros ...
```

### Traer un solo libro

`node cli-client.js findById --id "id"`

#### Ejemplo de Uso

Para obtener el libro con id: 125.

`node cli-client.js findById --id 125`

#### Respuesta

La respuesta será mostrada en la consola de la siguiente manera.

```bash
  Libro con id nro 125: {
    id: 125,
    isbn: "73524446452",
    title: "El Señor de los Anillos",
    author: "J.R.R. Tolkien",
    price: 48,
    publicationDate: "1975-09-22",
    genre: "misterio",
    createdAt: "2023-11-10T13:56:19.484Z",
    updatedAt: "2023-11-10T13:56:19.484Z"
  },
```

### Crear un nuevo libro

`node cli-client.js create --author "author" --publicationDate "publicationDate" --genre "genre" --price "price" --title "title" --isbn "isbn"`

#### Datos Requeridos

- **isbn**: ISBN del libro (debe ser único).
- **title**: Título del libro.
- **author**: Autor del libro.
- **genre**: Género del libro (Las opciones válidas son: Misterio, Ciencia ficción, Romance, Drama, Aventura, Acción, Terror, Histórico, Biografía, Filosofía, Política, Negocios o Autoayuda').
- **price**: Precio del libro.
- **publicationDate**: Fecha de publicación del libro.

#### Ejemplo de Uso

`node cli-client.js create --author "Gombrowicz" --publicationDate "1999-11-15" --genre "accion" --price "5" --title "f8erdydurke" --isbn "8"`

#### Respuesta

La respuesta será mostrada en la consola de la siguiente manera.

```bash
  Nuevo libro creado: {
    id: 1033,
    isbn: '165',
    title: 'f8erdydurke',
    author: 'Gombrowicz',
    publicationDate: '1999-11-14',
    price: '5.00',
    genre: 'accion',
    updatedAt: 2023-11-15T15:29:13.076Z,
    createdAt: 2023-11-15T15:29:13.076Z
  }
```

### Actualizar un libro

`node cli-client.js update --id "id" campoActualizado --nuevoDato `

#### Datos Requeridos (solo es necesario ingresar los datos que se deseen actualizar).

- **isbn**: ISBN del libro (debe ser único).
- **title**: Título del libro.
- **author**: Autor del libro.
- **genre**: Género del libro (Las opciones válidas son: Misterio, Ciencia ficción, Romance, Drama, Aventura, Acción, Terror, Histórico, Biografía, Filosofía, Política, Negocios o Autoayuda').
- **price**: Precio del libro.
- **publicationDate**: Fecha de publicación del libro.

#### Ejemplo de Uso

Para actualizar un libro con id: 14.

`node cli-client.js update --id 14 --title "Test" --publicationDate "1999-05-25" --price "8"  `

#### Respuesta

La respuesta será mostrada en la consola de la siguiente manera.

```bash
  Libro actualizado: {
    id: 14,
    isbn: '1516813718995',
    title: 'Test',
    author: 'Jana Morar Sr.',
    price: '8.00',
    publicationDate: '1999-05-24',
    genre: 'negocios',
    createdAt: 2023-11-10T13:56:19.484Z,
    updatedAt: 2023-11-15T15:33:05.101Z
  }
```

### Eliminar un libro

`node cli-client.js deleteById --id "id"`

#### Ejemplo de Uso

Para eliminar el libro con id: 14.

`node cli-client.js deleteById --id 14`

#### Respuesta

```bash
 Libro "Test" borrado.
```
