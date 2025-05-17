const OSS = require('ali-oss');
require('dotenv').config();

// Initialize OSS client
const client = new OSS({
  region: process.env.OSS_REGION,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET
});

// Test function to upload a file
async function testOSSConnection() {
  try {
    const fileName = `test-${Date.now()}.txt`;
    
    // Try to upload a simple text file
    const result = await client.put(
      fileName,
      Buffer.from('Hello from expense tracker app! This file should remain in OSS.')
    );
    console.log('Upload successful! ✅');
    console.log('File URL:', result.url);
    console.log('File Name:', fileName);
    console.log('\nYou can check this file in your OSS console.');
    console.log('The file will remain in your bucket for verification.');

    // Try to get and verify the file
    const file = await client.get(fileName);
    console.log('\nFile content verification:', file.content.toString());
    
  } catch (error) {
    console.error('OSS test failed ❌');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    console.error('RequestId:', error.requestId);
  }
}

// Run the test
testOSSConnection();
