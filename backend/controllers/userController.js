const User = require('../models/userModel');
require('dotenv').config()

// Update user details
exports.updateUser = async (req, res) => {
    // const { name, email } = req.body;
    // const {userId} = req.params;
  
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }
        await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ msg: 'User updated successfully' });
      } catch (err) {
        res.status(500).json({ msg: 'Server error' });
      }
  };
  
  // Get logged-in user's details
exports.getUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); // Exclude password
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  // Delete user account
exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.id);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.json({ msg: 'User deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  