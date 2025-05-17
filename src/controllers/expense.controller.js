const Expense = require('../models/expense.model');
const ossUtil = require('../utils/oss.util');

const createExpense = async (req, res) => {
  try {
    const { description, amount, category, date, taxDeductible, notes } = req.body;
    
    const expense = new Expense({
      userId: req.user.id,
      description,
      amount,
      category,
      date: date || new Date(),
      taxDeductible: taxDeductible || false,
      notes
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error creating expense',
        details: error.message
      }
    });
  }
};

const uploadReceipt = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        error: {
          message: 'No file uploaded'
        }
      });
    }

    // Upload to OSS using our utility
    const result = await ossUtil.uploadFile(file.originalname, file.buffer, req.user.id);

    // Update expense with receipt info
    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      {
        receipt: {
          url: result.url,
          key: result.key
        }
      },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({
        error: {
          message: 'Expense not found'
        }
      });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error uploading receipt',
        details: error.message
      }
    });
  }
};

const getExpenses = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    const query = { userId: req.user.id };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (category) {
      query.category = category;
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    
    // Calculate totals
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const taxDeductibleTotal = expenses
      .filter(exp => exp.taxDeductible)
      .reduce((sum, exp) => sum + exp.amount, 0);

    res.json({
      expenses,
      summary: {
        total,
        taxDeductibleTotal,
        count: expenses.length
      }
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error fetching expenses',
        details: error.message
      }
    });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        error: {
          message: 'Expense not found'
        }
      });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error fetching expense',
        details: error.message
      }
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { description, amount, category, date, taxDeductible, notes } = req.body;
    
    const expense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      {
        description,
        amount,
        category,
        date,
        taxDeductible,
        notes
      },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({
        error: {
          message: 'Expense not found'
        }
      });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error updating expense',
        details: error.message
      }
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        error: {
          message: 'Expense not found'
        }
      });
    }

    // Delete receipt from OSS if exists
    if (expense.receipt?.key) {
      await ossUtil.deleteFile(expense.receipt.key);
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error deleting expense',
        details: error.message
      }
    });
  }
};

module.exports = {
  createExpense,
  uploadReceipt,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
};
