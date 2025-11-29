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

// Use Vite environment variable if provided, otherwise default to local.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

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
    const text = await response.text();
    throw new Error(
      `Failed to fetch curiosity questions. Status: ${response.status}. Body: ${text}`
    );
  }

  const data = await response.json();
  return data.problems || [];
}

/**
 * fetchSessionPlan
 * ----------------
 * Calls: POST /api/session-plan
 *
 * @param {string} concept
 * @param {string} knowledgeProblem
 * @param {string} audience
 * @returns {Promise<string>}  planText
 */
export async function fetchSessionPlan({ concept, chosenQuestion, audience = 'higher-ed' }) {
  const response = await fetch(`${API_BASE_URL}/session-plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ concept, knowledgeProblem: chosenQuestion, audience })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch session plan. Status: ${response.status}. Body: ${text}`);
  }

  const data = await response.json();
  return data.planText || '';
}
