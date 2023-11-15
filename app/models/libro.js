const normalize = require('normalize-text');
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: 0,
});

const Libro = sequelize.define('libro', {
	isbn: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'isbn no puede ser nulo',
			},
		},
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Título no puede ser nulo',
			},
		},
	},
	author: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Autor no puede ser nulo',
			},
		},
	},
	price: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Precio no puede ser nulo',
			},
			
		},
	},
	publicationDate: {
		type: DataTypes.DATEONLY,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Fecha no puede ser nula',
			},
			isDate: {
				args: true,
				msg: 'El formato de fecha no es válido. Debe estar en el formato "aaaa-mm-dd".',
			},
		},
	},
	genre: {
		type: DataTypes.ENUM(
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
			'autoayuda'
		),
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Género no puede ser nulo',
			},
			isIn: {
				args: [
					[
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
				],
				msg: 'El género no es válido. Las opciones válidas son: Misterio, Ciencia ficción, Romance, Drama, Aventura, Acción, Terror, Histórico, Biografía, Filosofía, Política, Negocios o Autoayuda',
			},
		},
		set(value) {
			const normalizedValue = normalize.normalizeText(value.toLowerCase());
			this.setDataValue('genre', normalizedValue);
		},
	},
});

module.exports = Libro;
