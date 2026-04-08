const db = require("../../config/db");
const bcrypt = require("bcrypt");

// 🔹 CREATE
exports.createEmp = async (companyId, companyCode, body) => {
  const { first_name, email, password, role } = body;

  if (!first_name || !email || !password) {
    throw new Error("Required fields missing");
  }

  if (!companyCode) {
    throw new Error("Company code missing in token");
  }

  // check duplicate
  const check = await db.query(
    "SELECT id FROM employee WHERE email=$1 AND company_id=$2",
    [email, companyId]
  );

  if (check.rows.length > 0) {
    throw new Error("Employee already exists");
  }

  const hash = await bcrypt.hash(password, 10);

  const result = await db.query(
    `INSERT INTO employee 
    (company_id, company_code, first_name, email, password, role)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING id, first_name, email, role, company_code`,
    [companyId, companyCode, first_name, email, hash, role || "employee"]
  );

  return result.rows[0];
};


// 🔹 GET ALL
exports.getAllEmp = async (companyId) => {
  const result = await db.query(
    "SELECT id, first_name, email, role FROM employee WHERE company_id=$1",
    [companyId]
  );

  return result.rows;
};


// 🔹 GET BY ID
exports.getEmpById = async (companyId, empId) => {
  const result = await db.query(
    "SELECT id, first_name, email, role FROM employee WHERE id=$1 AND company_id=$2",
    [empId, companyId]
  );

  if (result.rows.length === 0) {
    throw new Error("Employee not found");
  }

  return result.rows[0];
};


// 🔹 UPDATE
exports.updateEmp = async (companyId, empId, body) => {
  const { first_name, role } = body;

  const result = await db.query(
    `UPDATE employee
     SET first_name = COALESCE($1, first_name),
         role = COALESCE($2, role)
     WHERE id=$3 AND company_id=$4
     RETURNING id, first_name, email, role`,
    [first_name, role, empId, companyId]
  );

  if (result.rows.length === 0) {
    throw new Error("Employee not found");
  }

  return result.rows[0];
};


// 🔹 DELETE
exports.deleteEmp = async (companyId, empId) => {
  const result = await db.query(
    "DELETE FROM employee WHERE id=$1 AND company_id=$2 RETURNING id",
    [empId, companyId]
  );

  if (result.rows.length === 0) {
    throw new Error("Employee not found");
  }

  return true;
};