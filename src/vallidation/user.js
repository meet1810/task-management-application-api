
const { body, validationResult } = require('express-validator');

const validateUser = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
];

const validateUpdateUser = [
    body('name')
        .optional()
        .trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email')
        .optional()
        .isEmail().withMessage('Please provide a valid email')
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
    validateUser,
    validateUpdateUser,
    handleValidationErrors
};