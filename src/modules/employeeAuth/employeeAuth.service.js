const db = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async ({ email, password }) => {
  const result = await db.query(
    "SELECT * FROM employee WHERE email=$1",
    [email]
  );

  const user = result.rows[0];
  if (!user) throw new Error("Employee not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,         
      companyId: user.company_id
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};