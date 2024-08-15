const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
// const User = require('../models/userModel');
const sendEmail = require('../utils/email');
require('dotenv').config()

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

  const result =   await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
    res.status(200).send('User Registered Successfully.');
    console.log(result)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Authenticate user and get token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
    // res.status(200).send("Login Successful.")
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get logged-in user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Request password reset
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const message = `Hi ${user.name}, Please click on the following link, or paste this into your browser to complete the process: \n\n ${resetUrl}`;

    await sendEmail(user.email, 'Password reset link', message);

    res.status(200).json({ msg: 'Password reset link sent to your email. Please check your inbox and spam folder' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Reset password
exports.resetPassword = async (req, res) => {
  const { token } = req.params; // Read the token from URL parameters
  const { newPassword } = req.body;

  try {
    let user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }

    user.password = newPassword; 
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log('User after password reset:', await User.findById(user.id).select('password'));

    res.status(200).json({ msg: 'Password reset successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Logout user
exports.logout = (req, res) => {
  // Since JWTs are stateless, we don't need to do anything on the server side for logout
  // Just send a success response
  res.status(200).json({ msg: 'Logout successful' });
};

exports.validateToken = async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    res.status(200).json({ msg: 'Token is valid' });
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
