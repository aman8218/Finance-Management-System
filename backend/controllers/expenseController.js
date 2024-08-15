const Expense = require('../models/expenseModel');

// Add a new expense
exports.addExpense = async (req, res) => {
  const { title, amount, date, category, description } = req.body;

  try {
    const newExpense = new Expense({
      user: req.user.id,
      title,
      amount,
      date,
      category,
      description,
    });

    const expense = await newExpense.save();
    res.json(expense);
    console.log(expense)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all expenses for a user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  const { title, amount, date, category, description } = req.body;

    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { title, amount, date, category, description },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        res.json(updatedExpense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Expense removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
