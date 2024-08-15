const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const incomeController = require('../controllers/incomeController');

// @route    POST api/incomes
// @desc     Add a new income
// @access   Private
router.post(
  '/add',
  [
    auth,
    [
      check('title', 'title is required.').not().isEmpty(),
      check('amount', 'Amount is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
    ],
  ],
  incomeController.addIncome
);

// @route    GET api/incomes
// @desc     Get all incomes for user
// @access   Private
router.get('/', auth, incomeController.getIncomes);

// @route    PUT api/incomes/:id
// @desc     Update an income
// @access   Private
router.put('/:id', auth, incomeController.updateIncome);

// @route    DELETE api/incomes/:id
// @desc     Delete an income
// @access   Private
router.delete('/:id', auth, incomeController.deleteIncome);

module.exports = router;
