const router = require("express").Router();
const controller = require("./emp.controller");
const auth = require("../../middleware/authMiddleware");

// ✅ protected by company login
router.post("/", auth, controller.createEmp);  // create employee
router.get("/", auth, controller.getEmp);      // get all employees

module.exports = router;