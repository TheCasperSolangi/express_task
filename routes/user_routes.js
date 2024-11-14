const express = require('express');
const { register, login, resetPasswordCode, resetPasswordVerify, resetNewPass, updateUserField, deleteAccount } = require('../controllers/user_controller');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/reset-password', resetPasswordCode); 
router.post('/verify-code', resetPasswordVerify);
router.post('/new-password', resetNewPass); 

router.put('/update-field', jwtMiddleware, updateUserField); 
router.delete('/delete-account', jwtMiddleware ,deleteAccount); 

module.exports = router;