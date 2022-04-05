const {
  getAttendance,
  getAttendanceStatus,
} = require('../controllers/studentAttendance');

const router = require('express').Router();

router.get('/status', getAttendanceStatus);
router.get('/:id', getAttendance);

module.exports = router;
