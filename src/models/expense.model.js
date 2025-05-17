const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['food', 'transport', 'utilities', 'entertainment', 'healthcare', 'office', 'other']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  receipt: {
    url: String,
    key: String // OSS object key
  },
  taxDeductible: {
    type: Boolean,
    default: false
  },
  notes: String,
  ocrData: {
    vendorName: String,
    items: [{
      description: String,
      amount: Number
    }],
    totalAmount: Number,
    receiptDate: Date,
    rawText: String
  }
}, {
  timestamps: true
});

// Add indexes for common queries
expenseSchema.index({ userId: 1, date: -1 });
expenseSchema.index({ userId: 1, category: 1 });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
