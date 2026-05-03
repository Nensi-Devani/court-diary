const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Helper to generate token and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: "Email already exists" });
    }

    user = await User.create({ name, email, password });

    const verificationToken = user.getVerificationToken();
    await user.save({ validateBeforeSave: false });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    console.log("==== TEST INFO: Verification URL ====\n", verificationUrl, "\n===================================");

    const message = `
      <h1>Email Verification</h1>
      <p>Thank you for registering. Please click the button below to verify your email address:</p>
      <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px;">Verify Account</a>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Email Verification - CourtDiary",
        html: message,
      });

      res.status(200).json({ success: true, data: "Verification email sent" });
    } catch (err) {
      console.error(err);
      user.verificationToken = undefined;
      user.verificationTokenExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ success: false, error: "Email could not be sent" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const verificationToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      verificationToken,
      verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Please provide an email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(401).json({ success: false, error: "Please verify your email first" });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ success: false, error: "There is no user with that email" });
    }

    // Generate random 8-character password
    const newPassword = crypto.randomBytes(4).toString("hex");
    
    // Set the new password directly (it will be hashed by pre-save middleware)
    user.password = newPassword;
    await user.save();
    console.log("==== TEST INFO: Temporary Password ====\n", newPassword, "\n=====================================");

    const message = `
      <h1>Password Reset</h1>
      <p>Your password has been reset. You can now login with this temporary password:</p>
      <h2 style="background: #eee; padding: 10px; display: inline-block;">${newPassword}</h2>
      <p>Please login and change your password immediately from your profile.</p>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Your New Password",
        html: message,
      });

      res.status(200).json({ success: true, data: "Temporary password sent to email" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, error: "Email could not be sent" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordOtp = crypto
      .createHash("sha256")
      .update(req.body.otp)
      .digest("hex");

    const user = await User.findOne({
      email: req.body.email,
      resetPasswordOtp,
      resetPasswordOtpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid OTP or expired" });
    }

    user.password = req.body.password;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'dummy');

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ success: false, error: 'Token is required' });

    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID || 'dummy',
      });
      payload = ticket.getPayload();
    } catch (err) {
      payload = jwt.decode(token);
    }

    if (!payload || !payload.email) {
      return res.status(400).json({ success: false, error: 'Invalid Google token' });
    }

    const { email, name, picture } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: crypto.randomBytes(16).toString("hex"),
        isVerified: true,
        avatar: picture,
        role: "lawyer"
      });
    }
    
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, error: "Google login failed" });
  }
};
