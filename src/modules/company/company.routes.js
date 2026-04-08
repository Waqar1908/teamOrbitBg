const express = require("express");
const router = express.Router();

const auth = require("../../middleware/authMiddleware");
const { uploadSingle } = require("../../middleware/upload");

const {
  getProfile,
  updateProfile
} = require("./company.controller");

// 🔹 routes
router.get("/profile", auth, getProfile);

router.put(
  "/update",
  auth,
  uploadSingle("logo"), // 🔥 file field
  updateProfile
);

module.exports = router;