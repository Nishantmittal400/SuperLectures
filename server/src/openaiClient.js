/**
 * openaiClient.js
 * ----------------
 * This module owns EVERYTHING related to talking to OpenAI.
 *
 * Goals:
 * - Hide all low-level API details from the rest of the app.
 * - Provide simple, intention-revealing functions:
 *     - generateKnowledgeProblems()
 *     - generateSessionPlan()
 *
 * If you ever want to:
 *   - change the model (e.g., gpt-4.1-mini → gpt-4.1),
 *   - tweak prompts,
 *   - adjust temperature,
 * you ONLY touch this file.
 */

import 'dotenv/config';
import OpenAI from 'openai';

// ---------------------------------------------------------------------------
// 1. Basic safety checks for environment
// ---------------------------------------------------------------------------
if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    'OPENAI_API_KEY is not set. Please create a .env file in /server and define OPENAI_API_KEY.'
  );
}

// ---------------------------------------------------------------------------
// 2. Initialize a single OpenAI client instance
// ---------------------------------------------------------------------------
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Central place to pick the default model.
// You can change this to any compatible model string later.
const DEFAULT_MODEL = 'gpt-4.1-mini';

/**
 * generateKnowledgeProblems
 * -------------------------
 * Input:
 *   - concept: string       (e.g., "Regression")
 *   - audience: string      (e.g., "MBA students", default "higher-ed")
 *
 * Output:
 *   - Promise<string[]>     (array of 5 knowledge-problem strings)
 *
 * What it does:
 *   - Asks the model: “Why does this concept exist? What deep questions does it answer?”
 *   - Returns around 5 “knowledge problem” statements.
 */
export async function generateKnowledgeProblems({ concept, audience = 'higher-ed' }) {
  // "System" style instructions – how the model should behave overall.
  const instructions = `
You are an expert teacher and learning designer.

Your task:
- Given a concept, generate 5 distinct "knowledge problems" for that concept.

Definition:
- A "knowledge problem" expresses WHY this concept exists.
- It reveals the confusion, limitation, or reasoning gap that the concept solves.

Constraints:
- Audience: ${audience}.
- Each knowledge problem must be:
    - Under 20 words.
    - Focused and non-overlapping.
- Return exactly 5 items in a numbered list.
`.trim();

  const userInput = `
Concept: ${concept}

Generate 5 deep knowledge problems for this concept.
Number them 1–5.
Do NOT include explanations, only the statements themselves.
`.trim();

  // Using the Responses API (recommended in latest docs).
  // See: https://platform.openai.com/docs/api-reference/responses
  const response = await client.responses.create({
    model: DEFAULT_MODEL,
    instructions,
    input: userInput
  });

  // Shortcut: output_text is already a concatenated string of the model's text output.
  const rawText = response.output_text || '';

  // We expect something like:
  // 1. ...
  // 2. ...
  // 3. ...
  // We'll parse that into an array of clean strings.
  const lines = rawText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const problems = [];

  for (const line of lines) {
    // Remove any leading "1.", "2)", "3 -", etc.
    const cleaned = line.replace(/^\d+[\).\s-]*/, '').trim();
    if (cleaned) {
      problems.push(cleaned);
    }
  }

  // Just in case the model gives more or fewer, slice to exactly 5.
  if (problems.length === 0) {
    // Safety fallback: if parsing fails, just return the whole text as a single problem.
    return [rawText];
  }

  return problems.slice(0, 5);
}

/**
 * generateSessionPlan
 * -------------------
 * Input:
 *   - concept: string
 *   - knowledgeProblem: string
 *   - audience: string (optional)
 *
 * Output:
 *   - Promise<string> (raw text for the OHCR session plan)
 *
 * What it does:
 *   - Asks the model to construct 3–4 observations.
 *   - For each observation:
 *       - 3 hypotheses (naive → advanced)
 *       - 1 challenge per hypothesis
 *       - optional follow-up hypothesis
 *       - a clear Resolution block
 *   - The output is formatted text that we will display as-is on the frontend.
 */
export async function generateSessionPlan({ concept, knowledgeProblem, audience = 'higher-ed' }) {
  const instructions = `
You are an expert instructional designer using the OHCR framework:

O = Observe
H = Hypothesize
C = Challenge
R = Resolve

Your job:
- Given a concept and a knowledge problem,
  design a classroom-ready session flow using OHCR.

Audience: ${audience}.

Constraints:
- Create 3 to 4 Observations.
- For EACH Observation:
    - Give it a short title and a 2–3 line description.
    - Provide 3 student hypotheses:
        - Hypothesis 1 (naive)
        - Hypothesis 2 (intermediate)
        - Hypothesis 3 (advanced)
    - For each hypothesis, write one strong teacher challenge.
    - Optionally add a follow-up hypothesis only if it clearly advances the reasoning.
    - End with a "Resolution" block:
        - 3–5 lines clarifying the concept.
        - 2 explicit "Takeaway" bullet points.

Tone:
- Concrete, specific, and easy for a teacher to read inside class.
- Avoid generic filler. Use realistic student thinking.
`.trim();

  const userInput = `
Concept: ${concept}
Knowledge Problem: ${knowledgeProblem}

Now generate the full OHCR session plan.

Use this approximate structure:

Observation 1: <short title>
Description: <2–3 lines>

  Hypothesis 1 (naive):
    - <text>
  Challenge 1:
    - <teacher question>
  Follow-up Hypothesis 1 (optional):
    - <text>

  Hypothesis 2 (intermediate):
    - <text>
  Challenge 2:
    - <teacher question>
  Follow-up Hypothesis 2 (optional):
    - <text>

  Hypothesis 3 (advanced):
    - <text>
  Challenge 3:
    - <teacher question>
  Follow-up Hypothesis 3 (optional):
    - <text>

Resolution 1:
  - <3–5 lines explanation>
  - Takeaway 1: ...
  - Takeaway 2: ...

Observation 2: ...
(Repeat similar pattern for each Observation)
`.trim();

  const response = await client.responses.create({
    model: DEFAULT_MODEL,
    instructions,
    input: userInput
  });

  const planText = response.output_text || '';

  // We just return the text and let the frontend render it nicely.
  return planText;
}
