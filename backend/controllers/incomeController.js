const Income = require('../models/incomeModel');

// Add a new income
exports.addIncome = async (req, res) => {
  const { title, amount, date, category, description } = req.body;

  try {
    const newIncome = new Income({
      user: req.user.id, // Assuming the user is authenticated and the user ID is available in req.user
      title,
      amount,
      date: date || Date.now(), // Use provided date or current date
      category,
      description,
    });

    const income = await newIncome.save();
    res.status(201).json(income);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all incomes for a user
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({ date: -1 });
    res.json(incomes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update an income
exports.updateIncome = async (req, res) => {
  const { amount, category, description,title,date } = req.body;

  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      { amount, category, description, title, date },
      { new: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ msg: 'Income not found' });
    }

    if (updatedIncome.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(updatedIncome);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Delete an income
exports.deleteIncome = async (req, res) => {
  try {
    let income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ msg: 'Income not found' });
    }

    if (income.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Income.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Income removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
