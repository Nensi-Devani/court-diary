const express = require("express");
const {
  getMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meetings");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getMeetings)
  .post(createMeeting);

router.route("/:id")
  .put(updateMeeting)
  .delete(deleteMeeting);

module.exports = router;
