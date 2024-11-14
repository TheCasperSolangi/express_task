// routes/authRoutes.js
const express = require('express');
const { register, login, resetPasswordCode, resetPasswordVerify, resetNewPass, updateUserField, deleteAccount } = require('../controllers/user_controller');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// Password reset routes
router.post('/reset-password', resetPasswordCode); // Request OTP
router.post('/verify-code', resetPasswordVerify); // Verify OTP
router.post('/new-password', resetNewPass); // Set new password

// New routes for updating a specific field and deleting account
router.put('/update-field', jwtMiddleware, updateUserField); // Update specific field
router.delete('/delete-account', jwtMiddleware ,deleteAccount); // Delete user account

module.exports = router;