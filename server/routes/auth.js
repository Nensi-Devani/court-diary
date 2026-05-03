const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  verifyEmail,
  googleLogin,
} = require("../controllers/auth");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.post("/google", googleLogin);

module.exports = router;
