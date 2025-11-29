/**
 * ConceptForm.jsx
 * ---------------
 * Main input card for:
 * - Concept name (what the teacher wants to teach).
 * - Audience description (optional).
 * - "Generate Curiosity Questions" button.
 *
 * All state is controlled by the parent (App) and passed as props.
 * This keeps the component presentational and easy to reuse or test.
 */

import React from 'react';

function ConceptForm({
  concept,
  onConceptChange,
  audience,
  onAudienceChange,
  onGenerate,
  disabled
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <section className="glass-card" id="feature-block">
      <h2 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.3rem' }}>
        1. Tell us what you want to teach.
      </h2>
      <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem' }}>
        Type any concept — from regression to semiotics — and we’ll surface the deep curiosity
        questions (the puzzle behind your topic) it was invented to solve.
      </p>

      <form onSubmit={handleSubmit} className="flex-col" style={{ gap: '0.9rem' }}>
        <div>
          <label style={{ fontSize: '0.85rem', opacity: 0.85 }}>
            Concept you want to teach
          </label>
          <input
            className="text-input"
            placeholder='e.g., "Regression", "Present Value", "Semiotics", "Brand Positioning"'
            value={concept}
            onChange={(e) => onConceptChange(e.target.value)}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', opacity: 0.85 }}>
            Audience (optional)
          </label>
          <input
            className="text-input"
            placeholder='e.g., "MBA students", "undergraduates", "working professionals"'
            value={audience}
            onChange={(e) => onAudienceChange(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button type="submit" className="button-primary" disabled={disabled || !concept.trim()}>
            {disabled ? 'Thinking...' : 'Generate Curiosity Questions'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ConceptForm;
