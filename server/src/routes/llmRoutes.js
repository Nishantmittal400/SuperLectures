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
  const { concept, audience } = req.body || {};

  if (!concept || typeof concept !== 'string' || !concept.trim()) {
    return res.status(400).json({ error: 'Missing or invalid "concept" in request body.' });
  }

  try {
    const problems = await generateKnowledgeProblems({
      concept: concept.trim(),
      audience
    });

    return res.status(200).json({ problems });
  } catch (err) {
    console.error('Error in /knowledge-problems', err);
    return res.status(500).json({ error: 'Failed to generate knowledge problems.' });
  }
});

/**
 * POST /api/session-plan
 *
 * Request body:
 *   {
 *     "concept": "Regression",
 *     "chosenQuestion": "How can we predict outcomes when multiple factors interact?",
 *     "audience": "MBA students"  // (optional)
 *   }
 *
 * Response body:
 *   {
 *     "planText": "Observation 1: ..."
 *   }
 */
router.post('/session-plan', async (req, res) => {
  const { concept, chosenQuestion, audience } = req.body || {};

  if (
    !concept ||
    typeof concept !== 'string' ||
    !chosenQuestion ||
    typeof chosenQuestion !== 'string'
  ) {
    return res.status(400).json({ error: 'Missing or invalid "concept" or "chosenQuestion".' });
  }

  try {
    const planText = await generateSessionPlan({
      concept: concept.trim(),
      knowledgeProblem: chosenQuestion.trim(),
      audience
    });

    return res.status(200).json({ planText });
  } catch (err) {
    console.error('Error in /session-plan', err);
    return res.status(500).json({ error: 'Failed to generate session plan.' });
  }
});

export default router;
