const db = require("../../config/db");

// 🔹 Get Profile
exports.getProfile = async (companyId) => {
  const result = await db.query(
    `SELECT id, name, email, company_code, logo_url
     FROM company
     WHERE id=$1`,
    [companyId]
  );

  return result.rows[0];
};


// 🔹 Update Profile (with image)
exports.updateProfile = async (companyId, body, logo) => {
  const { name } = body;

  const result = await db.query(
    `UPDATE company
     SET name = COALESCE($1, name),
         logo_url = COALESCE($2, logo_url)
     WHERE id=$3
     RETURNING id, name, email, company_code, logo_url`,
    [name, logo, companyId]
  );

  return result.rows[0];
};