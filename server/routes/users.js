const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, authorize } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

// ── Self routes (any logged-in user) ──────────────────────────────

// GET /api/users/me  → get own profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/users/me  → update own profile
router.put('/me', protect, async (req, res) => {
  try {
    const { name, email, phone, mobile, officeName, officeEmail, officeContact, officeAddress } = req.body;
    const updateData = {
      name,
      email,
      phone: phone || mobile,
      office: {
        name: officeName,
        email: officeEmail,
        phone: officeContact,
        address: officeAddress,
      },
    };
    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/users/me/change-password  → change own password
router.put('/me/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, error: 'Please provide currentPassword and newPassword' });
    }
    const user = await User.findById(req.user.id);
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Current password is incorrect' });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ success: true, data: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/users/me/avatar  → upload own avatar
router.put('/me/avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: req.file.path }, {
      new: true,
      runValidators: true,
    }).select('-password');
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ── Admin-only routes ──────────────────────────────────────────────

// GET /api/users  → list all users (admin)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const query = req.query.role ? { role: req.query.role } : {};
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }
    const users = await User.find(query).select('-password');
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/users  → create lawyer (admin)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { name, email, password, mobile, officeName, officeEmail, officeContact, officeAddress } = req.body;
    const user = await User.create({
      name,
      email,
      password: password || 'password123',
      phone: mobile,
      role: 'lawyer',
      isVerified: true,
      office: {
        name: officeName,
        email: officeEmail,
        phone: officeContact,
        address: officeAddress,
      },
    });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/users/:id  → get single user (admin)
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/users/:id  → update user (admin)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { name, email, mobile, officeName, officeEmail, officeContact, officeAddress } = req.body;
    const updateData = {
      name,
      email,
      phone: mobile,
      office: {
        name: officeName,
        email: officeEmail,
        phone: officeContact,
        address: officeAddress,
      },
    };
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/users/:id  → delete user (admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/users/:id/avatar  → upload user avatar (admin)
router.put('/:id/avatar', protect, authorize('admin'), upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { avatar: req.file.path }, {
      new: true,
      runValidators: true,
    }).select('-password');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
