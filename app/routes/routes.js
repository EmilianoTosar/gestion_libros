const express = require('express');
const router = express.Router();
const {
	createBook,
	findBookById,
	findAllBooks,
	updateBook,
	deleteBook,
} = require('../controllers/controllers.js');

router.post('/', createBook);

router.get('/', findAllBooks);

router.get('/:id', findBookById);

router.patch('/:id', updateBook);

router.delete('/:id', deleteBook);

module.exports = router;
