const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(' ')[1];
    // console.log("Received token:", token);

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: 'No token provided. Access denied.'
      });
    }


    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.userId;
    next();

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 401,
        message: 'Token expired. Please login again.'
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 401,
        message: 'Invalid token. Access denied.'
      });
    }
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });
  }
};

module.exports = authMiddleware;
