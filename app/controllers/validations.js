const z = require('zod');
const Libro = require('../models/libro');
const normalize = require('normalize-text');

const genres = [
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
];

const libroSchema = z.object({
	isbn: z.string().refine(
		async input => {
			const existingBook = await Libro.findOne({ where: { isbn: input } });
			return existingBook?.isbn !== input;
		},
		{ message: 'Ya existe un libro con el mismo ISBN.' }
	),
	title: z.string(),
	author: z.string(),
	publicationDate: z.coerce.date(),
	price: z.coerce.number(),
	genre: z
		.string()
		.transform(val => normalize.normalizeText(val.toLowerCase()))
		.refine(val => genres.includes(val), {
			message:
				'Las opciones válidas son: Misterio, Ciencia ficción, Romance, Drama, Aventura, Acción, Terror, Histórico, Biografía, Filosofía, Política, Negocios o Autoayuda.',
		}),
});

module.exports = { libroSchema };
