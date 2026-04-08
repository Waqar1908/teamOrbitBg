const db = require("../../config/db");

// 🔹 CREATE HOLIDAY
exports.createHoliday = async (companyCode, body) => {
  const { title, date } = body;

  if (!companyCode) {
    throw new Error("Company code missing in token");
  }

  if (!title || !date) {
    throw new Error("Title and date required");
  }

  const result = await db.query(
    `INSERT INTO holiday (company_code, title, date)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [companyCode, title, date]
  );

  return result.rows[0];
};


// 🔹 GET ALL HOLIDAYS
exports.getAllHoliday = async (companyCode) => {
  if (!companyCode) {
    throw new Error("Company code missing in token");
  }

  const result = await db.query(
    "SELECT * FROM holiday WHERE company_code=$1 ORDER BY date ASC",
    [companyCode]
  );

  return result.rows;
};


// 🔹 DELETE HOLIDAY
exports.deleteHoliday = async (companyCode, id) => {
  const result = await db.query(
    "DELETE FROM holiday WHERE id=$1 AND company_code=$2 RETURNING id",
    [id, companyCode]
  );

  if (result.rows.length === 0) {
    throw new Error("Holiday not found");
  }

  return true;
};