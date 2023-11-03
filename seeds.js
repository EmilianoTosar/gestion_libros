const { faker } = require('@faker-js/faker');
const Libro = require('./app/models/libro');

async function seedDatabase() {
	await Libro.sequelize.sync({ force: true });

	const books = [];
	const seededBooks = 1000;
	for (let i = 0; i < seededBooks; i++) {
		books.push({
			isbn: faker.string.numeric(13),
			title: faker.lorem.sentence({ min: 2, max: 5 }),
			author: faker.person.fullName(),
			price: faker.number.float({ min: 5, max: 50, precision: 0.01 }),
			publicationDate: faker.date.between({
				from: '1890-01-01',
				to: '2023-01-01',
			}),
			genre: faker.helpers.arrayElement([
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
			]),
		});
	}

	await Libro.bulkCreate(books);

	console.log(`Cargados ${seededBooks} libros en la base de datos.`);
}

seedDatabase()
	.then(() => console.log('Base de datos cargada con 1000 libros'))
	.catch(e => console.log('Error cargando base de datos.', e));
