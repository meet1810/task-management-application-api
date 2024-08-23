const express = require('express');
const router = express.Router();
const { validateTask, validateUpdateTask, handleValidationErrors } = require('../vallidation/task');

const { taskController: tc } = require('../controllers/task');

router.post('/tasks', validateTask, handleValidationErrors, tc.add);
router.get('/tasks', tc.list);
router.get('/tasks/:id', tc.view);
router.put('/tasks/:id', validateUpdateTask, handleValidationErrors,tc.update);
router.delete('/tasks/:id', tc.remove);

module.exports = router;
