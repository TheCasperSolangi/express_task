const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'No authorization header, access denied' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Invalid token format, must use Bearer scheme' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired' });
    }
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};


const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // Token expires in 24 hours
  );
};