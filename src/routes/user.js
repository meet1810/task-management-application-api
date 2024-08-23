const express = require('express');
const router = express.Router();
const { validateUser, validateUpdateUser, handleValidationErrors } = require('../vallidation/user');

const { userController: uc } = require('../controllers/user');

router.post('/users', validateUser, handleValidationErrors, uc.add);
router.get('/users', uc.list);
router.get('/users/:id', uc.view);
router.put('/users/:id', validateUpdateUser, handleValidationErrors,uc.update);
router.delete('/users/:id', uc.remove);

module.exports = router;
