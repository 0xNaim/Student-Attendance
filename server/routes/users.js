const userController = require('../controllers/users');

const router = require('express').Router();

// Get user by id or email
router.get('/:userId', userController.getUserById);

// Update user by id or email
router.put('/:userId', userController.putUserById);

// Update user by id or email
router.patch('/:userId', userController.patchUserById);

// Delete user by id or email
router.delete('/:userId', userController.deleteUserById);

// Get users
router.get('/', userController.getUsers);

// Create a new user
router.post('/', userController.postUser);

module.exports = router;
