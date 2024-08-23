const { body, validationResult } = require('express-validator');
const users = require('../models/user');
const projects = require('../models/project');

const validateProject = [
    body('name')
        .notEmpty().withMessage('Project name is required'),
    body('userId')
        .notEmpty().withMessage('User ID is required')  
        .isInt().withMessage('User ID must be an integer')
]

const validateUpdateProject = [
    body('userId')
        .optional()
        .isInt().withMessage('User ID must be an integer')];

const handleValidationErrors = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation failed', error: errors.errors[0].msg });
        }
        next();
    } catch (error) {
        return res.status(400).send({ message: 'Validation failed', error: error.message });
    }
};

module.exports = {
    validateProject,
    validateUpdateProject,
    handleValidationErrors
};
