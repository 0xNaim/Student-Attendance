const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const adminAttendanceRoutes = require('./adminAttendance');
const studentAttendanceRoutes = require('./studentAttendance');
const authRoutes = require('./auth');
const userRoutes = require('./users');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', authenticate, userRoutes);
router.use('/api/v1/admin/attendance', authenticate, adminAttendanceRoutes);
router.use('/api/v1/student/attendance', authenticate, studentAttendanceRoutes);

module.exports = router;
