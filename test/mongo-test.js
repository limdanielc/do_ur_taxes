const mongoose = require('mongoose');
require('dotenv').config();

async function testMongoConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('URI:', process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully ✅');

    // Create a test collection and document
    const Test = mongoose.model('Test', new mongoose.Schema({
      name: String,
      date: { type: Date, default: Date.now }
    }));

    const testDoc = new Test({ name: 'test document' });
    await testDoc.save();
    console.log('Test document created successfully ✅');

    // Read it back
    const doc = await Test.findOne({ name: 'test document' });
    console.log('Retrieved test document:', doc);

    // Clean up
    await Test.deleteOne({ _id: doc._id });
    console.log('Test document cleaned up ✅');

  } catch (error) {
    console.error('Test failed ❌');
    console.error('Error:', error.message);
    if (error.codeName) {
      console.error('Code Name:', error.codeName);
    }
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the test
testMongoConnection();
