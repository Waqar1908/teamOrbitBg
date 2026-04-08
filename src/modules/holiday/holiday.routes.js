const router = require("express").Router();
const controller = require("./holiday.controller");
const auth = require("../../middleware/authMiddleware");

// 🔥 company protected routes

router.post("/", auth, controller.createHoliday);
router.get("/", auth, controller.getHoliday);
router.delete("/:id", auth, controller.deleteHoliday);

module.exports = router;