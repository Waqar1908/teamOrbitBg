const db = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateCompanyId } = require("../../utils/generateCompanyId");

exports.signup = async ({ name, email, password, team_size }) => {
  const companyCode = generateCompanyId();
  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO company(name,email,password,team_size,company_code) VALUES($1,$2,$3,$4,$5) RETURNING id,name,email,team_size,company_code",
      [name, email, hash, team_size, companyCode]
    );

    return result.rows[0];

  } catch (err) {
    if (err.code === "23505") {
      throw new Error("Email already registered");
    }
    throw err;
  }
};

exports.login = async ({ email, password }) => {
  const result = await db.query(
    "SELECT * FROM company WHERE email=$1",
    [email]
  );

  const user = result.rows[0];
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign(
    {
      id: user.id,
      company_code: user.company_code,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    company: {
      id: user.id,
      name: user.name,
      email: user.email,
      team_size: user.team_size,
      company_code: user.company_code
    }
  };
};