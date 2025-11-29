/**
 * Layman-friendly explainer of the teaching flow shown near the top of the page.
 * It keeps the language simple while highlighting the journey from situation to takeaway.
 */
import React from 'react';

const steps = [
  {
    title: 'Step 1 – Start from a real situation',
    body:
      'Instead of beginning with a definition or formula, you begin with a concrete example, story, or classroom situation that students can picture. This gives them something real to react to.'
  },
  {
    title: 'Step 2 – Let students think out loud',
    body:
      'You invite students to share their ideas about what might be going on. They may be right, wrong, or half-right — that’s okay. The point is to make their thinking visible.'
  },
  {
    title: 'Step 3 – Ask smarter questions, not just give answers',
    body:
      'Rather than correcting them immediately, you ask targeted questions that gently stretch their ideas. You compare, contrast, and probe their reasoning so they have to refine how they think.'
  },
  {
    title: 'Step 4 – Tie it together into a clear takeaway',
    body:
      'Finally, you connect the dots: you show the pattern, name the concept, or state the rule. Students don’t just hear the answer — they feel how the answer solves the puzzle they were wrestling with.'
  }
];

function FrameworkExplainer() {
  return (
    <section className="glass-card" style={{ marginTop: '1.25rem' }}>
      <h2 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.3rem' }}>
        How this App designs your session (in simple terms)
      </h2>
      <p style={{ fontSize: '0.95rem', opacity: 0.85, marginBottom: '1rem' }}>
        Think of this App as a co-planner for your class. You tell it what topic you want to teach, and
        it helps you turn that topic into a live, think-aloud journey for your students — not just a
        one-way lecture.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {steps.map((step) => (
          <div
            key={step.title}
            style={{
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <strong style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
              {step.title}
            </strong>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>{step.body}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '0.9rem', opacity: 0.78, marginTop: '1rem' }}>
        This page helps you design that whole journey: from the first situation you put on the board,
        to the curiosity question behind it, to the teacher guiding questions you pose, and finally to
        the clear takeaway your students walk away with.
      </p>
    </section>
  );
}

export default FrameworkExplainer;
