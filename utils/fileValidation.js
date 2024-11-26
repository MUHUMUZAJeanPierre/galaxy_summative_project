const Joi = require('joi');
const mongoose = require('mongoose');

const fileValidationSchema = Joi.object({
    fileName: Joi.string()
        .required()
        .messages({
            'string.base': `"fileName" should be a type of 'text'`,
            'string.empty': `"fileName" cannot be an empty field`,
        }),

    filePath: Joi.string()
        .required()
        .messages({
            'string.base': `"filePath" should be a type of 'text'`,
            'string.empty': `"filePath" cannot be an empty field`,
            'any.required': `"filePath" is a required field`
        }),

    createdAt: Joi.date()
        .default(Date.now)
        .messages({
            'date.base': `"createdAt" should be a valid date`
        }),

    userId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message('"userId" must be a valid ObjectId');
            }
            return value;
        })
        .required()
        .messages({
            'string.base': `"userId" should be a type of 'text'`,
            'any.required': `"userId" is a required field`
        })
});

const options = {
    abortEarly: false, 
    allowUnknown: true, 
    stripUnknown: true 
};

const validateFile = (fileData) => {
    const result = fileValidationSchema.validate(fileData, options);
    console.log("Validation Result:", result);
    return result;
};


module.exports = { validateFile, options };
