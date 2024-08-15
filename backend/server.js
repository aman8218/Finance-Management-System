const express = require('express');
const app = express();

app.use(express.json());

const router = express.Router();

router.post(
  '/register',
  [
    require('express-validator').check('name', 'Name is required').not().isEmpty(),
    require('express-validator').check('email', 'Please include a valid email').isEmail(),
    require('express-validator').check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = require('express-validator').validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('User registered');
  }
);

app.use('/api/auth', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
