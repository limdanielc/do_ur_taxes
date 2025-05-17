const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: {
          message: 'Username or email already exists'
        }
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate token
    const token = user.generateAuthToken();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error registering user',
        details: error.message
      }
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({
      $or: [
        { username },
        { email: username } // Allow login with email too
      ]
    });

    if (!user) {
      return res.status(401).json({
        error: {
          message: 'Invalid credentials'
        }
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: {
          message: 'Invalid credentials'
        }
      });
    }

    // Generate token
    const token = user.generateAuthToken();

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error logging in',
        details: error.message
      }
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found'
        }
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error fetching profile',
        details: error.message
      }
    });
  }
};

module.exports = {
  register,
  login,
  getProfile
};
