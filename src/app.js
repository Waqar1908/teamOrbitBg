const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TeamOrbit API Running 🚀");
});

app.use("/api/auth", require("./modules/auth/auth.routes"));

app.use("/employee-auth", require("./modules/employeeAuth/employeeAuth.routes"));
app.use("/api/emp", require("./modules/emp/emp.routes"));

module.exports = app; 