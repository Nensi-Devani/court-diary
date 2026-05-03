const express = require("express");
const {
  getNotifications,
  markAsRead,
  createNotification,
} = require("../controllers/notifications");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getNotifications)
  .post(createNotification);

router.put("/:id/read", markAsRead);

module.exports = router;
