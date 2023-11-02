const Libro = require('../app/models/libro');

const createBook = (cliData) => {
  const libro = cliData;

  if (
    !libro.isbn ||
    !libro.title ||
    !libro.author ||
    !libro.price ||
    !libro.publicationDate ||
    !libro.genre
  ) {
    const errorMessage =
      "Todos los campos requeridos (isbn, title, author, price, publicationDate, genre) deben estar presentes.";

    console.error(errorMessage);
    process.exit(1);
  }

  Libro.create(libro)
    .then((data) => {
      console.log("Libro agregado con éxito:", data);
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error al agregar libro:", err.message);
      process.exit(1);
    });
};

const findAllBooks = () => {
  Libro.findAll()
    .then((data) => {
      console.log("Todos los libros:", data);
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error trayendo los libros:", err.message);
      process.exit(1);
    });
};

const findBookById = (id) => {
  Libro.findByPk(id)
    .then((data) => {
      if (data) {
        console.log(`Libro con id nro ${id}:`, data);
        process.exit(0);
      } else {
        console.error(`No se encontro libro con id: ${id}`);
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error(`Error buscando libro con id: ${id}`);
      process.exit(1);
    });
};

const updateBook = (body, id) => {
  Libro.update(body, {
    where: { id: id },
  })
    .then(([num]) => {
      if (num >= 1) {
        console.log("Libro actualizado!");
        process.exit(0);
      } else {
        console.error(
          `No se pudo actualizar el libro ${body.title}, ocurrió un error!`
        );
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error(`Error actualizando libro ${body.title}`, err);
      process.exit(1);
    });
};

const deleteBook = (id) => {
  Libro.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        console.log("Libro borrado");
        process.exit(0);
      } else {
        console.error("Error eliminando libro", err);
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error("Error eliminando libro", err);
      process.exit(1);
    });
};

const deleteAllBooks = () => {
  Libro.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      console.log(`${nums} libros borrados`);
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error borrando todos los libros:", err.message);
      process.exit(1);
    });
};

module.exports = {
  createBook,
  findBookById,
  findAllBooks,
  updateBook,
  deleteBook,
  deleteAllBooks,
};
