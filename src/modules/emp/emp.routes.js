const router = require("express").Router();
const controller = require("./emp.controller");
const auth = require("../../middleware/authMiddleware");

// 🔹 CREATE
router.post("/", auth, controller.createEmp);

// 🔹 GET ALL
router.get("/", auth, controller.getEmp);

// 🔹 GET BY ID
router.get("/:id", auth, controller.getEmpById);

// 🔹 UPDATE
router.put("/:id", auth, controller.updateEmp);

// 🔹 DELETE
router.delete("/:id", auth, controller.deleteEmp);

module.exports = router;