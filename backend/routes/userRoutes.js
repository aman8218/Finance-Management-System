const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.put(
  '/:id',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
  ],
  userController.updateUser
);

router.get('/', auth, userController.getUser);

// Delete user account
router.delete('/me', auth, userController.deleteUser);



module.exports = router;
