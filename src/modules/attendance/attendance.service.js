const db = require('../../config/db');

exports.checkIn = async (empId) => {
  const today = new Date().toISOString().split('T')[0];

  const existing = await db.query(
    'SELECT id FROM attendance WHERE emp_id=$1 AND attendance_date=$2',
    [empId, today]
  );

  if (existing.rows.length) {
    throw new Error('Already checked in today');
  }

  await db.query(
    `INSERT INTO attendance (emp_id, attendance_date, check_in, status)
     VALUES ($1, $2, NOW(), 'present')`,
    [empId, today]
  );

  return { message: 'Check-in successful' };
};

exports.checkOut = async (empId) => {
  const today = new Date().toISOString().split('T')[0];

  const result = await db.query(
    'SELECT * FROM attendance WHERE emp_id=$1 AND attendance_date=$2',
    [empId, today]
  );

  if (!result.rows.length) {
    throw new Error('Check-in not found');
  }

  const record = result.rows[0];

  if (record.check_out) {
    throw new Error('Already checked out');
  }

  const checkIn = new Date(record.check_in);
  const checkOut = new Date();

  const hours = (checkOut - checkIn) / (1000 * 60 * 60);

  let status = 'present';

  const checkInHour = checkIn.getHours();

  if (checkInHour >= 10) {
    status = 'late';
  }

  if (hours < 4) {
    status = 'half_day';
  }

  await db.query(
    `UPDATE attendance
     SET check_out=$1, total_hours=$2, status=$3
     WHERE id=$4`,
    [checkOut, hours.toFixed(2), status, record.id]
  );

  return { message: 'Check-out successful', hours, status };
};

exports.getMyAttendance = async (empId) => {
  const data = await db.query(
    'SELECT * FROM attendance WHERE emp_id=$1 ORDER BY attendance_date DESC',
    [empId]
  );

  return data.rows;
};

exports.getMonthlyReport = async (empId, month, year) => {
  const data = await db.query(
    `SELECT 
      COUNT(*) FILTER (WHERE status='present') as present_days,
      SUM(total_hours) as total_hours
     FROM attendance
     WHERE emp_id=$1
     AND EXTRACT(MONTH FROM attendance_date)=$2
     AND EXTRACT(YEAR FROM attendance_date)=$3`,
    [empId, month, year]
  );

  return data.rows[0];
};