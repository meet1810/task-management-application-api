const express = require('express');
const router = express.Router();
const { validateProject, validateUpdateProject, handleValidationErrors } = require('../vallidation/project');

const { projectController: pc } = require('../controllers/project');

router.post('/projects', validateProject, handleValidationErrors, pc.add);
router.get('/projects', pc.list);
router.get('/projects/:id', pc.view);
router.put('/projects/:id', validateUpdateProject, handleValidationErrors,pc.update);
router.delete('/projects/:id', pc.remove);

module.exports = router;
