const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const expenseController = require('../controllers/expenseController');

// @route    POST api/expenses
// @desc     Add a new expense
// @access   Private
router.post(
  '/add',
  [
    auth,
    [
      check('amount', 'Amount is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
    ],
  ],
  expenseController.addExpense
);

// @route    GET api/expenses
// @desc     Get all expenses for user
// @access   Private
router.get('/', auth, expenseController.getExpenses);

// @route    PUT api/expenses/:id
// @desc     Update an expense
// @access   Private
router.put('/:id', auth, expenseController.updateExpense);

// @route    DELETE api/expenses/:id
// @desc     Delete an expense
// @access   Private
router.delete('/:id', auth, expenseController.deleteExpense);

module.exports = router;
