/**
 * api.js
 * ------
 * Small helper module that wraps calls to the backend.
 *
 * Why?
 * - Keeps fetch() logic in one place.
 * - Makes components cleaner.
 * - If you change backend URL or add auth headers later, you only change here.
 */

// Hardcode the backend URL for now to guarantee production reliability.
const API_BASE_URL = 'https://super-lectures-api.onrender.com/api';

console.log('🔍 API_BASE_URL at runtime:', API_BASE_URL);

/**
 * fetchKnowledgeProblems
 * ----------------------
 * Calls: POST /api/knowledge-problems
 *
 * @param {string} concept   - Concept user wants to teach.
 * @param {string} audience  - Optional audience description.
 * @returns {Promise<string[]>}
 */
export async function fetchKnowledgeProblems(concept, audience = 'higher-ed') {
  const response = await fetch(`${API_BASE_URL}/knowledge-problems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ concept, audience })
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    console.error('Knowledge problems API failed', response.status, text);
    throw new Error('Failed to generate curiosity questions');
  }

  const data = await response.json();
  return data.problems || [];
}

/**
 * fetchSessionPlan
 * ----------------
 * Calls: POST /api/session-plan
 *
 * @param {string|object} conceptOrPayload - Concept string or payload object.
 * @param {string} [chosenQuestion]         - Optional knowledge problem string.
 * @param {string} [audience]               - Optional audience override.
 * @returns {Promise<string>}  planText
 */
export async function fetchSessionPlan(conceptOrPayload, chosenQuestion, audience = 'higher-ed') {
  let concept;
  let chosenQuestionValue;
  let audienceValue = audience;

  // Flexible input handling
  if (typeof conceptOrPayload === 'object' && conceptOrPayload !== null) {
    concept = conceptOrPayload.concept;
    chosenQuestionValue = conceptOrPayload.chosenQuestion;
    if (conceptOrPayload.audience) {
      audienceValue = conceptOrPayload.audience;
    }
  } else {
    concept = conceptOrPayload;
    chosenQuestionValue = chosenQuestion;
  }

  // IMPORTANT:
  // Backend expects { concept, knowledgeProblem }
  const payload = {
    concept,
    knowledgeProblem: chosenQuestionValue,  // 👈 FIXED HERE
    audience: audienceValue
  };

  const response = await fetch(`${API_BASE_URL}/session-plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    console.error('Session plan API failed', response.status, text);
    throw new Error('Failed to generate session plan');
  }

  const data = await response.json();
  return data.planText || '';
}
