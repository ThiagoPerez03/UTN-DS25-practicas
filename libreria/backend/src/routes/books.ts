const { Router } = require('express');
const ctrl = require('../controllers/booksController');

const router = Router();

router.get('/', ctrl.listBooks);
router.get('/:id', ctrl.getBook);
router.post('/', ctrl.createBook);
router.put('/:id', ctrl.updateBook);
router.delete('/:id', ctrl.removeBook);

module.exports = router;
