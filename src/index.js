const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth.routes');
const expenseRoutes = require('./routes/expense.routes');

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`CORS enabled for ${config.corsOrigin}`);
});
