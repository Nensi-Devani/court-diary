const express = require("express");
const {
  getCases,
  getCase,
  createCase,
  updateCase,
  deleteCase,
  uploadCaseDocument,
  deleteCaseDocument,
} = require("../controllers/cases");
const { protect } = require("../middlewares/auth");
const { upload } = require("../middlewares/upload");

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getCases)
  .post(createCase);

router.route("/:id")
  .get(getCase)
  .put(updateCase)
  .delete(deleteCase);

router.post("/:id/upload", upload.single("file"), uploadCaseDocument);
router.delete("/:id/documents/:docId", deleteCaseDocument);

module.exports = router;
