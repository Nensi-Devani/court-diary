const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  isVerified: { type: Boolean, default: false },

  phone: { type: String },

  avatar: { type: String },

  office: {
    name: String,
    email: String,
    address: String,
    phone: String
  },

  role: {
    type: String,
    enum: ["admin", "lawyer"],
    default: "lawyer"
  },

  verificationToken: String,
  verificationTokenExpire: Date,
  resetPasswordOtp: String,
  resetPasswordOtpExpire: Date,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function() {
  if (!this.isModified("password")) {
    return;
  }
  const bcrypt = require("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  const bcrypt = require("bcryptjs");
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash verification token
UserSchema.methods.getVerificationToken = function() {
  const crypto = require("crypto");
  // Generate token
  const verificationToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to verificationToken field
  this.verificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  // Set expire
  this.verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};

// Generate OTP
UserSchema.methods.getResetPasswordOtp = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit
  
  const crypto = require("crypto");
  this.resetPasswordOtp = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  this.resetPasswordOtpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return otp;
};

UserSchema.index({ email: 1 });

module.exports = mongoose.model("User", UserSchema);
