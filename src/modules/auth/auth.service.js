const db = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async ({ name, email, password }) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO company(name,email,password) VALUES($1,$2,$3) RETURNING id,name,email",
      [name, email, hash]
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
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    company: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
};