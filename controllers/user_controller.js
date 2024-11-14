const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user_schema');

exports.register = async (req, res) => {
  const { username, email, password, first_name, last_name, lat, long } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, first_name, last_name, lat, long });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Signin Successful", token  });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.resetPasswordCode = async (req, res) => {
    const { userId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ msg: 'User not found' });

      const otp = Math.floor(1000 + Math.random() * 9000); 
      user.resetOtp = otp;
      user.resetOtpExpires = Date.now() + 300000; 
  
      await user.save();
      res.json({ msg: 'OTP issued', otp });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  };
  

  exports.resetPasswordVerify = async (req, res) => {
    const { userId, otp } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ msg: 'User not found' });
  
    
      if (user.resetOtp !== otp || Date.now() > user.resetOtpExpires) {
        return res.status(400).json({ msg: 'Invalid or expired OTP' });
      }
  
    
      res.json({ msg: 'OTP verified successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  
  exports.resetNewPass = async (req, res) => {
    const { userId, newPassword } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ msg: 'User not found' });
  

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      user.resetOtp = undefined;
      user.resetOtpExpires = undefined;
  
      await user.save();
      res.json({ msg: 'Password reset successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  };


exports.updateUserField = async (req, res) => {
    const { field, value } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ msg: 'User not found' });
      if (field in user) {
        user[field] = value;
        await user.save();
        return res.json({ msg: 'User field updated successfully', updatedField: { [field]: value } });
      } else {
        return res.status(400).json({ msg: 'Invalid field' });
      }
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  };
  

  exports.deleteAccount = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.id);
      if (!user) return res.status(404).json({ msg: 'User not found' });
  
      res.json({ msg: 'User account deleted successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  };