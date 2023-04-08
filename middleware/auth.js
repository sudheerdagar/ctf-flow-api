const jwt = require('jsonwebtoken');
//const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied: token missing' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    console.log(decoded);

    // Add user from payload to request object
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Authorization denied: invalid token' });
  }
};
