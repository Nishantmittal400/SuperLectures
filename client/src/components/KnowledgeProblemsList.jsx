/**
 * KnowledgeProblemsList.jsx
 * -------------------------
 * Displays the list of curiosity questions generated for the given concept.
 *
 * Props:
 *  - concept: string
 *  - problems: string[]
 *  - selectedIndex: number | null
 *  - onSelect: (index: number) => void
 *  - onGeneratePlan: () => void
 *  - loadingPlan: boolean
 */

import React from 'react';

function KnowledgeProblemsList({
  concept,
  problems,
  selectedIndex,
  onSelect,
  onGeneratePlan,
  loadingPlan
}) {
  if (!concept) return null;

  return (
    <section style={{ marginTop: '1.25rem' }}>
      <h2 style={{ marginBottom: '0.4rem', fontSize: '1.2rem' }}>
        2. Choose the Curiosity Question you want to work with.
      </h2>

      <p style={{ fontSize: '0.88rem', opacity: 0.85, marginBottom: '0.4rem' }}>
        These are the curiosity questions — the puzzles your concept helps solve. Pick the one that
        best matches what you want your students to wrestle with.
      </p>

      {problems.length === 0 ? (
        <p style={{ fontSize: '0.88rem', opacity: 0.7 }}>
          Once you generate curiosity questions, they’ll show up here as cards you can tap to select.
        </p>
      ) : (
        <>
          <div className="kp-grid">
            {problems.map((p, idx) => (
              <div
                key={idx}
                className={`kp-card ${selectedIndex === idx ? 'selected' : ''}`}
                onClick={() => onSelect(idx)}
              >
                <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.3rem' }}>
                  Curiosity Question {idx + 1}
                </div>
                <div>{p}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.8rem' }}>
            <button
              className="button-primary"
              disabled={selectedIndex === null || loadingPlan}
              onClick={onGeneratePlan}
            >
              {loadingPlan ? 'Designing your session...' : 'Generate detailed session plan'}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default KnowledgeProblemsList;
