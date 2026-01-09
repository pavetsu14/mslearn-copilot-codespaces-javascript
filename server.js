const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint - API documentation
app.get('/', (req, res) => {
  res.json({
    message: 'API Server is running',
    endpoints: {
      'GET /api/hello': 'Returns a greeting message',
      'GET /api/user': 'Returns user information',
      'POST /api/data': 'Accepts and returns data'
    }
  });
});

// Sample API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Get user info endpoint
app.get('/api/user', (req, res) => {
  res.json({
    name: 'Alexandrie Grenier',
    title: 'Web Designer & Content Creator',
    email: 'alex@example.com'
  });
});

// Sample POST endpoint
app.post('/api/data', (req, res) => {
  const { data } = req.body;
  res.json({
    success: true,
    message: 'Data received',
    received: data
  });
});

// Generate endpoint
app.post('/generate', (req, res) => {
  const { text } = req.body;
  res.json({
    success: true,
    message: 'Generated response',
    result: `You submitted: ${text || 'No text provided'}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
