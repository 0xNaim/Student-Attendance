const router = require('express').Router();
const {registerController} = require('../controllers/auth')

router.post('/register', registerController);
// router.post('/login', loginController);

router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test router' });
});

module.exports = router;
