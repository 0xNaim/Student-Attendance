const { findUserByProperty, createNewUser } = require('./user');
const bcrypt = require('bcryptjs');
const error = require('../utils/error');

// Register service
const registerService = async ({ name, email, password, roles }) => {
  let user = await findUserByProperty('email', email);
  if (user) throw error('User already exist', 400);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return createNewUser({ name, email, password: hash, roles });
};

module.exports = {
  registerService,
};
