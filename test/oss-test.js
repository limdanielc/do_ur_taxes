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
    // Try to upload a simple text file
    const result = await client.put(
      'test.txt',
      Buffer.from('Hello from expense tracker app!')
    );
    console.log('Upload successful! File URL:', result.url);

    // Try to get the file
    const file = await client.get('test.txt');
    console.log('File content:', file.content.toString());

    // Clean up - delete the test file
    await client.delete('test.txt');
    console.log('Test file deleted successfully');

    console.log('OSS connection test passed! ✅');
  } catch (error) {
    console.error('OSS connection test failed ❌');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    console.error('RequestId:', error.requestId);
  }
}

// Run the test
testOSSConnection();
