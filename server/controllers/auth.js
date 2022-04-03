const Joi = require('joi');
const { registerService, loginService } = require('../services/auth');
const error = require('../utils/error');
const {
  registerSchemaValidator,
  loginSchemaValidator,
} = require('../validations/auth');
const errorMsgFormatter = require('../validations/errorFormatter');

const registerController = async (req, res, next) => {
  try {
    const { name, email, password, roles } =
      await registerSchemaValidator.validateAsync(req.body, {
        abortEarly: false,
      });

    const user = await registerService({ name, email, password, roles });

    return res.status(201).json({ message: 'User Created Successfully', user });
  } catch (err) {
    // const error = errorMsgFormatter(err);
    // console.log(err);
    // res.status(400).json(error);
    next(err);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = await loginSchemaValidator.validateAsync(
      req.body
    );

    const token = await loginService({ email, password });
    return res.status(200).json({ message: 'Login Successful', token });
  } catch (err) {
    // const error = errorMsgFormatter(err);
    // console.log(err);
    // res.status(400).json(error);

    next(err);
  }
};

module.exports = {
  registerController,
  loginController,
};
