const express = require("express");
const {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clients");
const { protect } = require("../middlewares/auth");
const { upload } = require("../middlewares/upload");

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getClients)
  .post(upload.single('avatar'), createClient);

router.route("/:id")
  .get(getClient)
  .put(upload.single('avatar'), updateClient)
  .delete(deleteClient);

module.exports = router;
