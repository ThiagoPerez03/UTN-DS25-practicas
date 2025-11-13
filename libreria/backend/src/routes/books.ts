const { Router } = require('express');
const ctrl = require('../controllers/booksController');

const router = Router();

const { requireAuth } = require('../middlewares/auth');

router.get('/', ctrl.listBooks);
router.get('/:id', ctrl.getBook);
router.post('/', requireAuth, ctrl.createBook);
router.put('/:id', requireAuth, ctrl.updateBook);
router.delete('/:id', requireAuth, ctrl.removeBook);

module.exports = router;
