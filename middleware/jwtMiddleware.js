const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ msg: 'No authorization header, access denied' });
  }

  // Check if it follows Bearer scheme
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Invalid token format, must use Bearer scheme' });
  }

  // Extract the token
  const token = authHeader.replace('Bearer ', '');

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired' });
    }
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Usage example in your routes
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // Token expires in 24 hours
  );
};