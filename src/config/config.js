require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/expense_tracker',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000', // React default port
  ossConfig: {
    region: process.env.OSS_REGION,
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    bucket: process.env.OSS_BUCKET
  }
};
