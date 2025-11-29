/**
 * index.js
 * --------
 * Entry point for the backend.
 *
 * Responsibilities:
 *  - Load environment variables.
 *  - Initialize Express application.
 *  - Configure CORS and JSON parsing.
 *  - Mount API routes.
 *  - Start HTTP server.
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import llmRoutes from './routes/llmRoutes.js';

const app = express();

// ---------------------------------------------------------------------------
// 1. CORS configuration
// ---------------------------------------------------------------------------
app.use(
  cors({
    // For a production deployment, you would restrict this to your real frontend domain.
    origin: '*'
  })
);

// ---------------------------------------------------------------------------
// 2. JSON body parsing
// ---------------------------------------------------------------------------
app.use(express.json());

// ---------------------------------------------------------------------------
// 3. Mount our API routes under /api
// ---------------------------------------------------------------------------
app.use('/api', llmRoutes);

// Simple health check route – helpful for debugging quickly in browser or Postman.
app.get('/', (req, res) => {
  res.send('OHCR Session Planner backend is running ✅');
});

// ---------------------------------------------------------------------------
// 4. Start server
// ---------------------------------------------------------------------------
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Backend server is running at http://localhost:${PORT}`);
});
