const userService = require('../services/user');
const authService = require('../services/auth');
const error = require('../utils/error');
const { registerSchemaValidator } = require('../validations/auth');

// Get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await userService.findUser();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get user by id
const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService
      .findUserByProperty('_id', userId)
      .select('-password');

    if (!user) {
      throw error('User not found!', 404);
    }

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Create new user
const postUser = async (req, res, next) => {
  try {
    const { name, email, password, roles, accountStatus } =
      await registerSchemaValidator.validateAsync(req.body, {
        abortEarly: false,
      });

    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update user by id
const putUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, roles, accountStatus } = req.body;

  try {
    const user = await userService.updateUser(userId, {
      name,
      email,
      roles,
      accountStatus,
    });

    if (!user) throw error('User not found!', 404);

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update user by id
const patchUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, accountStatus } = req.body;

  try {
    const user = await userService
      .findUserByProperty('_id', userId)
      .select('-password');

    if (!user) throw error('User not found!', 404);

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Delete user by id
const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService
      .findUserByProperty('_id', userId)
      .select('-password');

    if (!user) {
      throw error('User not found!', 404);
    }

    await user.remove();
    return res.status(200).json({ message: 'User deleted successfully!' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
