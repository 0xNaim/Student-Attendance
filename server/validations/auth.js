const Joi = require('joi');

// Register schema
const registerSchemaValidator = Joi.object({
  name: Joi.string().trim().min(3).max(30).required().messages({
    'string.base': 'Name should be a type of string',
    'string.empty': 'Name is required',
    'string.min': 'Name should have a minimum length of 3',
    'string.max': 'Name should have a maximum length of 30',
    'any.required': 'Name is required',
  }),
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2 })
    .normalize()
    .required()
    .messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
      'string.base': 'Email must be a string',
      'string.email': 'Please provide a valid email',
    }),
  password: Joi.string()
    .min(6)
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})')
    )
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 6 characters long',
      'string.pattern.base':
        'Password contain at least 1 lowercase, 1 uppercase, 1 numeric and 1 special character',
    }),
  roles: Joi.string().valid('STUDENT', 'TEACHER').required().messages({
    'any.only': 'Role must be one of ["STUDENT", "TEACHER"] string value',
    'string.empty': 'Role is required',
    'string.base': 'Role is required',
  }),
  accountStatus: Joi.string()
    .valid('PENDING', 'ACTIVE', 'REJECTED')
    .required()
    .messages({
      'string.empty': 'Account status is required',
      'any.only':
        'Account status must be one of ["PENDING", "ACTIVE", "REJECTED] string value',
      'any.required': 'Account status is required',
      'string.base': 'Account status is required',
    }),
});

// Login schema
const loginSchemaValidator = Joi.object({
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2 })
    .normalize()
    .required()
    .messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
      'string.base': 'Email must be a string',
      'string.email': 'Please provide a valid email',
    }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
    'string.base': 'Password must be string',
  }),
});

module.exports = {
  registerSchemaValidator,
  loginSchemaValidator,
};
