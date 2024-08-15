const Budget = require('../models/budgetModel');

// Add a new budget
exports.addBudget = async (req, res) => {
  const { amount, duration, startDate, endDate, category } = req.body;

  try {
    const newBudget = new Budget({
      user: req.user.id,
      amount,
      duration,
      category,
      startDate,
      endDate,
    });

    const budget = await newBudget.save();
    res.status(201).json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all budgets for a user
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id }).sort({ startDate: -1 });
    res.json(budgets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a budget
exports.updateBudget = async (req, res) => {
  const { amount, duration, startDate, endDate, category } = req.body;

  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ msg: 'Budget not found' });
    }

    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    budget.amount = amount;
    budget.category = category;
    budget.duration = duration;
    budget.startDate = startDate;
    budget.endDate = endDate;

    await budget.save();
    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ msg: 'Budget not found' });
    }

    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Budget removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
