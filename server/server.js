require('dotenv').config();
const express = require('express');
const connectDB = require('./database/database');
const routes = require('./routes');

// App
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(routes);

// Port
const PORT = process.env.PORT || 8080;

// MongoDB connection
connectDB();

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, Express!' });
});

// Global error handling
app.use((err, req, res, next) => {
  console.log(err);
  const message = err.message ? err.message : 'Server Error Occurred';
  const status = err.status ? err.status : 500;

  res.status(status).json({
    message,
  });
});

// Server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
