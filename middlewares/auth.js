const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      res.status(401).json({ message: 'No Token, Authentication Failed' });
    }

    const decodedToken = jwt.verify(token, config.get('jwtSecret'));
    req.user = decodedToken.user;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
