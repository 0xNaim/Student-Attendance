const User = require('../models/User');
const error = require('../utils/error');

const findUser = () => {
  return User.find().select('-password');
};

const findUserByProperty = (key, value) => {
  if (key === '_id') {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : 'STUDENT',
    accountStatus: accountStatus ? accountStatus : 'PENDING',
  });
  return user.save();
};

const updateUser = async (id, data) => {
  const user = await findUserByProperty('email', data.email);
  if (user) throw error('Email already exist!', 400);
  return User.findByIdAndUpdate(id, { ...data }, { new: true }).select(
    '-password'
  );
};

module.exports = {
  findUserByProperty,
  createNewUser,
  findUser,
  updateUser,
};
