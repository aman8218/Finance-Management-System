const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  authController.register
);

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.login
);

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get('/', auth, authController.getUser);

router.post(
  '/request-password-reset',
  [check('email', 'Please include a valid email').isEmail()],
  authController.requestPasswordReset
);

// @route    POST api/auth/reset-password
// @desc     Reset password
// @access   Public
// Route for resetting password
router.post(
  '/reset-password/:token',
  [
    // Validation checks
    check('newPassword', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    // Handle validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pass to the controller
    authController.resetPassword(req, res, next);
  }
);

// Logout route
router.post('/logout',auth, authController.logout);

router.get('/validate-token', auth, authController.validateToken);

module.exports = router;
