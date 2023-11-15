const yargs = require('yargs');
const {
	createBook,
	updateBook,
	findAllBooks,
	findBookById,
	deleteBook,
} = require('../app/controllers/controllers');

yargs.command({
	command: 'create',
	describe: 'Agregar un nuevo libro',
	builder: {
		isbn: {
			describe: 'ISBN',
			demandOption: true,
			type: 'string',
		},
		title: {
			describe: 'Titulo',
			demandOption: true,
			type: 'string',
		},
		author: {
			describe: 'Autor',
			demandOption: true,
			type: 'string',
		},
		price: {
			describe: 'Precio',
			demandOption: true,
			type: 'float',
		},
		publicationDate: {
			describe: 'Fecha de lanzamiento del libro (en formato aaaa-mm-dd)',
			demandOption: true,
			type: 'string',
		},
		genre: {
			describe: 'Genero',
			demandOption: true,
			choices: [
				'misterio',
				'ciencia ficcion',
				'romance',
				'drama',
				'aventura',
				'accion',
				'terror',
				'historico',
				'biografia',
				'filosofia',
				'politica',
				'negocios',
				'autoayuda',
			],
		},
	},
	handler: argv => {
		const data = {
			isbn: argv.isbn,
			title: argv.title,
			author: argv.author,
			price: argv.price,
			publicationDate: argv.publicationDate,
			genre: argv.genre,
		};
		createBook(null, null, data);
	},
});

yargs.command({
	command: 'findAll',
	describe: 'Ver todos los libros',
	buider: {
		page: {
			describe: 'Pagina',
			demandOption: false,
			type: 'number',
		},
		limit: {
			describe: 'Libros por pagina',
			demandOption: false,
			type: 'number',
		},
	},
	handler: argv => {
		findAllBooks(null, null, argv);
	},
});

yargs.command({
	command: 'findById',
	describe: 'Encontrar libro por ID',
	builder: {
		id: {
			describe: 'id',
			demandOption: true,
			type: 'number',
		},
	},
	handler: argv => {
		findBookById(null, null, argv.id);
	},
});

yargs.command({
	command: 'update',
	describe: 'Actualizar libro',
	builder: {
		id: {
			describe: 'Id',
			demandOption: true,
			type: 'number',
		},
		isbn: {
			describe: 'ISBN',
			type: 'string',
		},
		title: {
			describe: 'Titulo',
			type: 'string',
		},
		author: {
			describe: 'Autor',
			type: 'string',
		},
		price: {
			describe: 'Precio',
			type: 'float',
		},
		publicationDate: {
			describe: 'Fecha de lanzamiento del libro (en formato aaaa-mm-dd)',
			type: 'string',
		},
		genre: {
			describe: 'Genero',
			choices: [
				'misterio',
				'ciencia ficcion',
				'romance',
				'drama',
				'aventura',
				'accion',
				'terror',
				'historico',
				'biografia',
				'filosofia',
				'politica',
				'negocios',
				'autoayuda',
			],
		},
	},
	handler: argv => {
		const data = {
			id: argv.id,
			isbn: argv.isbn,
			title: argv.title,
			author: argv.author,
			price: argv.price,
			publicationDate: argv.publicationDate,
			genre: argv.genre,
		};
		updateBook(null, null, data);
	},
});

yargs.command({
	command: 'deleteById',
	describe: 'Borrar libro por ID',
	builder: {
		id: {
			describe: 'id',
			demandOption: true,
			type: 'number',
		},
	},

	handler: argv => {
		deleteBook(null, null, argv.id);
	},
});

/* yargs.command({
	command: 'deleteAll',
	describe: 'Borrar todos los libros',
	handler: argv => {
		deleteAllBooks(argv);
	},
}); */

yargs.parse();
