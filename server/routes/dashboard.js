const express = require("express");
const { getUserStats, getAdminStats } = require("../controllers/dashboard");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

router.get("/user", protect, getUserStats);
router.get("/admin", protect, authorize("admin"), getAdminStats);

module.exports = router;
