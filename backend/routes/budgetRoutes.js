const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const budgetController = require('../controllers/budgetController');

// @route    POST api/budgets
// @desc     Add a new budget
// @access   Private
router.post(
  '/add-budget',
  [
    auth,
    [
      check('amount', 'Amount is required').not().isEmpty(),
      check('duration', 'Duration is required').not().isEmpty(),
      check('startDate', 'Start date is required').not().isEmpty(),
      check('endDate', 'End date is required').not().isEmpty(),
    ],
  ],
  budgetController.addBudget
);

// @route    GET api/budgets
// @desc     Get all budgets for user
// @access   Private
router.get('/', auth, budgetController.getBudgets);

// @route    PUT api/budgets/:id
// @desc     Update a budget
// @access   Private
router.put('/:id', auth, budgetController.updateBudget);

// @route    DELETE api/budgets/:id
// @desc     Delete a budget
// @access   Private
router.delete('/:id', auth, budgetController.deleteBudget);

module.exports = router;
