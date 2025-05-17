const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    req.token = token;
    
    next();
  } catch (error) {
    res.status(401).json({
      error: {
        message: 'Please authenticate'
      }
    });
  }
};

// Additional middleware for role-based access control
const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        error: {
          message: 'Access denied: insufficient permissions'
        }
      });
    }
    next();
  };
};

module.exports = {
  auth,
  requireRole
};
