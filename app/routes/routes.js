const express = require('express');
const router = express.Router();
const {
	createBook,
	findBookById,
	findAllBooks,
	updateBook,
	deleteBook,
	deleteAllBooks,
} = require('../controllers/controller.js');

router.post('/', createBook);

router.get('/', findAllBooks);

router.get('/:id', findBookById);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);

router.delete('/', deleteAllBooks);

module.exports = router;
