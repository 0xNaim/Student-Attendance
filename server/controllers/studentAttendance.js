const AdminAttendance = require('../models/AdminAttendance');
const StudentAttendance = require('../models/StudentAttendance');
const error = require('../utils/error');
const { addMinutes, isAfter } = require('date-fns');

const getAttendance = async (req, res, next) => {
  const { id } = req.params;
  try {
    const adminAttendance = await AdminAttendance.findById(id);
    if (!adminAttendance) {
      throw error('Invalid Attendance ID', 400);
    }

    if (adminAttendance.status === 'COMPLETED') {
      throw error('Attendance Already Completed', 400);
    }

    let attendance = await StudentAttendance.findOne({
      user: req.user._id,
      adminAttendance: id,
    });
    if (attendance) {
      throw error('Already Attend', 400);
    }

    attendance = await new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });
    await attendance.save();
    return res.status(201).json(attendance);
  } catch (err) {
    next(err);
  }
};

const getAttendanceStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: 'RUNNING' });
    if (!running) {
      throw error('Not running', 400);
    }

    const started = addMinutes(new Date(running.createdAt), running.timeLimit);
    if (isAfter(new Date(), started)) {
      running.status = 'COMPLETED';
      await running.save();
    }

    return res.status(200).json(running);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAttendance,
  getAttendanceStatus,
};
