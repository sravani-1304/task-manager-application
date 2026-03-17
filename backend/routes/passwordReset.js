const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const { sendPasswordResetEmail } = require('../services/emailService');

// @route   POST /api/password-reset/forgot
// @desc    Request password reset
router.post('/forgot', async (req, res) => {
  console.log('📧 Password reset requested for:', req.body.email);
  
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not (security best practice)
      return res.json({ 
        message: 'If an account exists with this email, you will receive a reset link.' 
      });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Hash token for storage (security)
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Delete any existing reset tokens for this user
    await PasswordReset.deleteMany({ userId: user._id });

    // Create new reset token
    await PasswordReset.create({
      userId: user._id,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 3600000) // 1 hour
    });

    // Create reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    // Send email
    await sendPasswordResetEmail(user.email, user.name, resetLink);

    res.json({ 
      message: 'If an account exists with this email, you will receive a reset link.' 
    });

  } catch (error) {
    console.error('❌ Password reset error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/password-reset/reset/:token
// @desc    Reset password with token
router.post('/reset/:token', async (req, res) => {
  console.log('🔑 Password reset attempt with token');
  
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash the token from params
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find valid reset token
    const resetToken = await PasswordReset.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
      used: false
    });

    if (!resetToken) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Find user
    const user = await User.findById(resetToken.userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Update password
    user.password = password;
    await user.save();

    // Mark token as used
    resetToken.used = true;
    await resetToken.save();

    console.log('✅ Password reset successful for:', user.email);

    res.json({ message: 'Password reset successful. You can now login with your new password.' });

  } catch (error) {
    console.error('❌ Password reset error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/password-reset/validate/:token
// @desc    Validate reset token
router.get('/validate/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const resetToken = await PasswordReset.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
      used: false
    });

    if (!resetToken) {
      return res.status(400).json({ valid: false });
    }

    res.json({ valid: true });

  } catch (error) {
    console.error('❌ Token validation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;