const db = require("../../config/db");
const bcrypt = require("bcrypt");


exports.createEmp = async (companyId, { name, email, password, role }) => {
  const check = await db.query(
    "SELECT id FROM employee WHERE email=$1 AND company_id=$2",
    [email, companyId]
  );

  if (check.rows.length > 0) {
    throw new Error("Employee with this email already exists");
  }

  // ✅ Hash password
  const hash = await bcrypt.hash(password, 10);

  const result = await db.query(
    `INSERT INTO employee(company_id, name, email, password, role)
     VALUES($1,$2,$3,$4,$5)
     RETURNING id, name, email, role`,
    [companyId, name, email, hash, role]
  );

  return result.rows[0];
};

exports.getAllEmp = async (companyId) => {
  const result = await db.query(
    "SELECT id,name,email,role FROM employee WHERE company_id=$1",
    [companyId]
  );

  return result.rows;
};