const express = require('express');
const router = express.Router();
const controller = require('./attendance.controller');

router.post('/check-in', controller.checkIn);
router.post('/check-out', controller.checkOut);

router.get('/my-attendance', controller.getMyAttendance);
router.get('/monthly-report', controller.getMonthlyReport);

module.exports = router;