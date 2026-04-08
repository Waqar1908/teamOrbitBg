const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TeamOrbit API Running 🚀");
});
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./modules/auth/auth.routes"));


app.use("/employee-auth", require("./modules/employeeAuth/employeeAuth.routes"));
app.use("/api/emp", require("./modules/emp/emp.routes"));
app.use("/api/company", require("./modules/company/company.routes"));
app.use("/api/holiday", require("./modules/holiday/holiday.routes"));



module.exports = app; 