const express = require("express");
const {
  getHearings,
  getHearing,
  createHearing,
  updateHearing,
  deleteHearing,
} = require("../controllers/hearings");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getHearings)
  .post(createHearing);

router.route("/:id")
  .get(getHearing)
  .put(updateHearing)
  .delete(deleteHearing);

module.exports = router;
