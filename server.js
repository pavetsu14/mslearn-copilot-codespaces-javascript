const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Allow simple CORS for dev (enables requests from Parcel dev server)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Simple POST /generate endpoint that echoes back a transformed response
app.post('/generate', (req, res) => {
  const payload = req.body || {};
  const text = typeof payload.text === 'string' ? payload.text : '';

  // Example processing: return reversed text plus length
  const reversed = text.split('').reverse().join('');
  res.json({
    input: text,
    output: reversed,
    length: text.length,
  });
});

// Serve static files for a production build (optional)
const staticDir = path.join(__dirname, 'dist');
if (require('fs').existsSync(staticDir)) {
  app.use(express.static(staticDir));
}

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
