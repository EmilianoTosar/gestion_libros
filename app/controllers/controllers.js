const Libro = require('../models/libro');
const { libroSchema } = require('./validations');

const createBook = async (req, res, cliData) => {
	try {
		const inputToParse = req?.body || cliData;
		const { data, error } = await libroSchema.safeParseAsync(inputToParse);
		if (error) {
			if (req) {
				return res.status(400).json({ error: JSON.parse(error) });
			} else {
				console.log(error.message);
				process.exit(1);
			}
		}
		const nuevoLibro = await Libro.create({ ...data });
		if (req) {
			return res.status(200).json(nuevoLibro);
		} else {
			console.log('Nuevo libro creado:', nuevoLibro.dataValues);
			process.exit(0);
		}
	} catch (err) {
		if (req) {
			return res.status(500).json({
				message: err.message || 'Ocurrió un error al crear el libro',
			});
		} else {
			console.log(err);
			process.exit(1);
		}
	}
};

const findAllBooks = async (req, res, cliData) => {
	try {
		const page = req?.query.page || parseInt(cliData.page, 10) || 1;
		const limit = req?.query.limit || parseInt(cliData.limit, 10) || 10;
		const offset = (page - 1) * limit;

		const data = await Libro.findAll({
			limit: limit,
			offset: offset,
		});

		if (data.length > 0) {
			if (req) {
				return res.status(200).json({
					message: `Devolviendo pagina ${page} con ${limit} libros por pagina:`,
					libros: data,
				});
			} else {
				console.log(
					`Devolviendo pagina ${page} con ${limit} libros por pagina:`
				);
				for (const libro of data) {
					console.log(libro.dataValues);
				}
				process.exit(0);
			}
		} else {
			if (req) {
				return res.status(404).json({ message: 'No hay libros para mostrar' });
			} else {
				console.log('No hay libros para mostrar');
			}
		}
	} catch (err) {
		if (req) {
			return res.status(500).json({
				message: err.message || 'Ocurrió un error!',
			});
		} else {
			console.error('Ocurrió un error:', err.message || 'Error desconocido');
		}
	}
};

const findBookById = async (req, res, cliData) => {
	const id = req?.params.id || cliData;

	try {
		const book = await Libro.findByPk(id);
		if (book) {
			if (req) {
				return res.json(book);
			} else {
				console.log(`Libro con id nro ${id}:`, book.dataValues);
				process.exit(0);
			}
		} else {
			if (req) {
				return res.status(404).json({
					message: `No se encontró un libro con el id: ${id}.`,
				});
			} else {
				console.error(`No se encontro libro con id: ${id}`);
				process.exit(1);
			}
		}
	} catch (err) {
		if (req) {
			return res.status(500).json({
				message: `Error buscando un libro con el id: ${id}`,
				error: err.message || 'Error desconocido',
			});
		} else {
			console.error(`Error buscando libro con id: ${id}`);
			process.exit(1);
		}
	}
};

const updateBook = async (req, res, cliData) => {
	try {
		const id = req?.params.id || cliData.id;
		const inputToParse = req?.body || cliData;
		const { data, error } = await libroSchema
			.partial()
			.safeParseAsync(inputToParse);

		if (error) {
			if (req) {
				return res.status(400).json({ error: JSON.parse(error) });
			} else {
				console.error(error.message);
				process.exit(1);
			}
		}

		const book = await Libro.findByPk(id);

		if (!book) {
			if (req) {
				return res
					.status(404)
					.json({ message: `No se encontro un libro con el id: ${id}` });
			} else {
				console.error(`No se encontro un libro con el id: ${id}`);
				process.exit(1);
			}
		}

		const [num] = await Libro.update(data, { where: { id: id } });

		if (num == 1) {
			const updatedBookInstance = await Libro.findByPk(id);
			if (req) {
				return res
					.status(200)
					.json({ message: 'Libro actualizado', book: updatedBookInstance });
			} else {
				console.log('Libro actualizado:', updatedBookInstance.dataValues);
				process.exit(0);
			}
		} else {
			if (req) {
				return res.json({
					message: `No se pudo actualizar el libro ${book.title}, ocurrio un error!`,
				});
			} else {
				console.error(
					`No se pudo actualizar el libro ${book.title}, ocurrio un error!`
				);
			}
		}
	} catch (err) {
		if (req) {
			return res.status(500).json({
				message: `Error actualizando libro ${book.title}`,
				err,
			});
		} else {
			console.error(`Error actualizando libro ${book.title}`);
			process.exit(1);
		}
	}
};

const deleteBook = async (req, res, cliData) => {
	const id = req?.params.id || cliData;
	console.log('id', id);
	try {
		const book = await Libro.findByPk(id);
		if (!book) {
			if (req) {
				return res
					.status(404)
					.json({ message: `No se encontro un libro con el id: ${id}` });
			} else {
				console.error(`No se encontro libro con id: ${id}`);
				process.exit(1);
			}
		}
		const num = await Libro.destroy({
			where: { id: id },
		});
		if (num == 1) {
			if (req) {
				return res
					.status(200)
					.json({ message: `Libro "${book.title}" borrado!` });
			} else {
				console.log(`Libro "${book.title}" borrado.`);
				process.exit(0);
			}
		} else {
			if (req) {
				res.status(500).json({
					//check si status 500 esta ok
					message: `No se pudo borrar el libro, ocurrio un error!`,
				});
			} else {
				console.error(`Error borrando libro con id: ${id}`);
				process.exit(1);
			}
		}
	} catch (err) {
		if (req) {
			return res.status(500).json({
				message: `Error borrando libro "${req.body.title}"`,
			});
		} else {
			console.error(`Error borrando libro con id: ${id}`, err);
			process.exit(1);
		}
	}
};

/* const deleteAllBooks = (req, res) => {
	Libro.destroy({
		where: {},
		truncate: false,
	})
		.then(nums => {
			res.json({ message: `${nums} Libros borrados!` });
		})
		.catch(err => {
			res.status(500).json({
				message: err.message || 'Ocurrio un error!',
			});
		});
}; */

module.exports = {
	createBook,
	findBookById,
	findAllBooks,
	updateBook,
	deleteBook,
};
