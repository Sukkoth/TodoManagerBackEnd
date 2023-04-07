const router = require('express').Router();
const TodoController = require('../App/Controllers/TodoController');

router.get('/', TodoController.index);
router.post('/', TodoController.store);
router.patch('/:todoId', TodoController.update);
router.delete('/:todoId', TodoController.delete);

module.exports = router;
