const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const morgan=require('morgan');

const app = express();

  app.use(morgan('dev'));

// Connect to MongoDB database
connectDB();


// Middleware for parsing JSON in request body
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

// Routes
app.use('/api/auth',authRoutes);
app.use('/api/challenges',challengeRoutes);
app.use('/api/rewards', rewardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal server error');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
