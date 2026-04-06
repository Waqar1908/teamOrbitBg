const router = require("express").Router();
const controller = require("./employeeAuth.controller");

router.post("/login", controller.login);

module.exports = router;