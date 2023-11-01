const normalize = require('normalize-text')

module.exports = (sequelize, Sequelize) => {
  const Libro = sequelize.define("libro", {
    isbn: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    publicationDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'El formato de fecha no es válido. Debe estar en el formato "aaaa-mm-dd".',
        },
      }
    },
    genre: {
      type: Sequelize.ENUM('misterio', 'ciencia ficcion', 'romance', 'drama', 'aventura', 'accion', 'terror', 'historico', 'biografia', 'filosofia', 'politica', 'negocios', 'autoayuda'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['misterio', 'ciencia ficcion', 'romance', 'drama', 'aventura', 'accion', 'terror', 'historico', 'biografia', 'filosofia', 'politica', 'negocios', 'autoayuda']],
          msg: 'El género no es válido. Las opciones válidas son: Misterio, Ciencia ficción, Romance, Drama, Aventura, Acción, Terror, Histórico, Biografía, Filosofía, Política, Negocios o Autoayuda',
        },
      },
      set(value) {
        const normalizedValue = normalize.normalizeText(value.toLowerCase());
        this.setDataValue('genre', normalizedValue);
      },
    }
  });

  return Libro;
};
