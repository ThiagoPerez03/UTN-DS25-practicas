const { Router } = require('express');
const ctrl = require('../controllers/booksController');

const router = Router();

const { requireAuth } = require('../middlewares/auth');

// IMPORTANTE: Esta ruta debe ir ANTES de /:id para que no se confunda
router.post('/replace-featured', requireAuth, ctrl.replaceFeaturedBook);

router.get('/', ctrl.listBooks);
router.get('/:id', ctrl.getBook);
router.post('/', requireAuth, ctrl.createBook);
router.put('/:id', requireAuth, ctrl.updateBook);
router.delete('/:id', requireAuth, ctrl.removeBook);

module.exports = router;
