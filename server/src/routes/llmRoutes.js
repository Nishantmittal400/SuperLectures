/**
 * llmRoutes.js
 * ------------
 * This file defines HTTP routes that expose our LLM-powered features:
 *
 *   POST /api/knowledge-problems
 *   POST /api/session-plan
 *
 * The routes are intentionally kept thin:
 *   - Validate input shape
 *   - Call the corresponding helper in openaiClient.js
 *   - Convert errors to friendly JSON responses
 */

import { Router } from 'express';
import { generateKnowledgeProblems, generateSessionPlan } from '../openaiClient.js';

const router = Router();

router.get('/health', (req, res) => {
  return res.status(200).json({ status: 'ok' });
});

/**
 * POST /api/knowledge-problems
 *
 * Request body:
 *   {
 *     "concept": "Regression",
 *     "audience": "MBA students"  // (optional)
 *   }
 *
 * Response body:
 *   {
 *     "problems": [ "...", "...", ... ]
 *   }
 */
router.post('/knowledge-problems', async (req, res) => {
  try {
    const { concept, audience } = req.body;

    if (!concept || typeof concept !== 'string' || !concept.trim()) {
      return res.status(400).json({ error: 'Missing or invalid "concept" in request body.' });
    }

    const problems = await generateKnowledgeProblems({ concept: concept.trim(), audience });

    return res.json({ problems });
  } catch (err) {
    console.error('[ERROR] /api/knowledge-problems:', err);
    return res.status(500).json({ error: 'Failed to generate knowledge problems.' });
  }
});

/**
 * POST /api/session-plan
 *
 * Request body:
 *   {
 *     "concept": "Regression",
 *     "knowledgeProblem": "How can we predict outcomes when multiple factors interact?",
 *     "audience": "MBA students"  // (optional)
 *   }
 *
 * Response body:
 *   {
 *     "planText": "Observation 1: ..."
 *   }
 */
router.post('/session-plan', async (req, res) => {
  try {
    const { concept, knowledgeProblem, audience } = req.body;

    if (!concept || !knowledgeProblem) {
      return res
        .status(400)
        .json({ error: 'Missing "concept" or "knowledgeProblem" in request body.' });
    }

    const planText = await generateSessionPlan({
      concept: concept.trim(),
      knowledgeProblem: knowledgeProblem.trim(),
      audience
    });

    return res.json({ planText });
  } catch (err) {
    console.error('[ERROR] /api/session-plan:', err);
    return res.status(500).json({ error: 'Failed to generate session plan.' });
  }
});

export default router;
