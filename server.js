const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const caseRoutes = require('./routes/caseRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({
  strict: true,
  verify: (req, res, buf) => {
    console.log('Raw Request Body:', buf.toString());
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      throw new Error('Invalid JSON format');
    }
  }
}));

// Routes
app.use('/api/cases', caseRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});