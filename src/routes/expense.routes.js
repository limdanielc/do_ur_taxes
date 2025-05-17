const express = require('express');
const multer = require('multer');
const { auth } = require('../middlewares/auth.middleware');
const {
  createExpense,
  uploadReceipt,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
} = require('../controllers/expense.controller');

const router = express.Router();
const upload = multer(); // Store in memory for direct upload to OSS

// All routes require authentication
router.use(auth);

router.post('/', createExpense);
router.get('/', getExpenses);
router.get('/:id', getExpenseById);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

// Receipt upload route
router.post('/:expenseId/receipt', upload.single('receipt'), uploadReceipt);

module.exports = router;
