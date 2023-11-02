const Libro = require("../models/libro");

const createBook = (req, res) => {
  const libro = {
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    publicationDate: req.body.publicationDate,
    genre: req.body.genre,
  };

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
    return res.status(400).send({
      message: errorMessage,
    });
  }

  Libro.create(libro)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el libro",
      });
    });
};

const findAllBooks = (req, res) => {
  Libro.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error!",
      });
    });
};

const findBookById = (req, res) => {
  const id = req.params.id;

  Libro.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontro un libro con el id: ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error buscando un libro con el id: ${id}`,
        err,
      });
    });
};

const updateBook = (req, res) => {
  const id = req.params.id;

  Libro.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Libro actualizado!",
        });
      } else {
        res.send({
          message: `No se pudo actualizar el libro ${req.body.title}, ocurrio un error!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error actualizando libro ${req.body.title}`,
        err,
      });
    });
};

const deleteBook = (req, res) => {
  const id = req.params.id;

  Libro.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Libro borrado!`,
        });
      } else {
        res.send({
          message: `No se pudo borrar el libro, ocurrio un error!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error borrando libro ${req.body.title}`,
      });
    });
};

const deleteAllBooks = (req, res) => {
  Libro.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Libros borrados!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error!",
      });
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
