const { body, validationResult } = require('express-validator');
const projects = require('../models/project');
const tasks = require('../models/task');

const validateTask = [
    body('title')
        .notEmpty().withMessage('Task title is required'),
    body('status')
        .notEmpty().withMessage('Task status is required')
        .isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be one of: pending, in-progress, completed'),
    body('projectId')
        .notEmpty().withMessage('Project ID is required')
        .isInt().withMessage('Project ID must be an integer')
];

const validateUpdateTask = [
    body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be one of: pending, in-progress, completed')
];

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
    validateTask,
    validateUpdateTask,
    handleValidationErrors
};
