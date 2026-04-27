const attendanceService = require('./attendance.service');

exports.checkIn = async (req, res) => {
  try {
    const result = await attendanceService.checkIn(req.user.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const result = await attendanceService.checkOut(req.user.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyAttendance = async (req, res) => {
  try {
    const data = await attendanceService.getMyAttendance(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMonthlyReport = async (req, res) => {
  try {
    const { month, year } = req.query;
    const data = await attendanceService.getMonthlyReport(
      req.user.id,
      month,
      year
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
