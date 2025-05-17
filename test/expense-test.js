const mongoose = require('mongoose');
const Expense = require('../src/models/expense.model');
const ossUtil = require('../src/utils/oss.util');
require('dotenv').config();

async function testExpenseCreation() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully ✅');

    // Create a test user ID (in real app this would come from authenticated user)
    const testUserId = new mongoose.Types.ObjectId();

    // Create a test expense
    const expense = new Expense({
      userId: testUserId,
      description: 'Office Supplies',
      amount: 150.00,
      category: 'office',
      taxDeductible: true,
      notes: 'Test expense'
    });

    // Save the expense
    await expense.save();
    console.log('Expense created successfully ✅');
    console.log('Expense details:', expense);

    // Test file upload
    const testFileContent = Buffer.from('This is a test receipt');
    const uploadResult = await ossUtil.uploadFile(
      'test-receipt.txt',
      testFileContent,
      testUserId.toString()
    );
    console.log('Receipt uploaded successfully ✅');
    console.log('Receipt URL:', uploadResult.url);

    // Update expense with receipt
    expense.receipt = {
      url: uploadResult.url,
      key: uploadResult.key
    };
    await expense.save();
    console.log('Expense updated with receipt ✅');

    // Cleanup
    await Expense.findByIdAndDelete(expense._id);
    await ossUtil.deleteFile(uploadResult.key);
    console.log('Cleanup completed ✅');

  } catch (error) {
    console.error('Test failed ❌');
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the test
testExpenseCreation();
