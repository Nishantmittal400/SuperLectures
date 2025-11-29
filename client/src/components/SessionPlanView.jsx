/**
 * SessionPlanView.jsx
 * -------------------
 * Renders the final session plan:
 *  - Shows the concept + selected curiosity question.
 *  - Displays the planText (raw but nicely structured).
 *  - Lets the user copy the plan or generate another variation.
 */

import React from 'react';

const renderFormattedPlan = (planText) => {
  const lines = planText.split('\n');
  const elements = [];
  let inResolution = false;

  const pushResolutionHeader = () => {
    elements.push(
      <div className="session-plan-resolution-header" key={`resolution-header-${elements.length}`}>
        <div className="session-plan-resolution-badge">Clear takeaway</div>
      </div>
    );
    inResolution = true;
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) {
      elements.push(<div key={`blank-${index}`} style={{ height: '1rem' }} />);
      return;
    }

    if (/^Observation\s+/i.test(line)) {
      inResolution = false;
      const title = line.replace(/^Observation\s+/i, '').trim();
      elements.push(
        <div className="session-plan-observation" key={`obs-${index}`}>
          <div className="session-plan-observation-badge">Observation</div>
          <h3 className="session-plan-observation-title">{title}</h3>
        </div>
      );
      return;
    }

    if (/^Description:/i.test(line)) {
      inResolution = false;
      elements.push(
        <p className="session-plan-description" key={`desc-${index}`}>
          {line.replace(/^Description:\s*/i, '')}
        </p>
      );
      return;
    }

    if (/^Hypothesis/i.test(line)) {
      inResolution = false;
      const match = line.match(/^([^:]+):\s*(.*)$/);
      const text = match ? match[2] : line;
      elements.push(
        <div className="session-plan-line" key={`hyp-${index}`}>
          <span className="session-plan-label">Student idea</span>
          <span className="session-plan-text">{text}</span>
        </div>
      );
      return;
    }

    if (/^Follow-up Hypothesis/i.test(line)) {
      inResolution = false;
      const text = line.replace(/^Follow-up Hypothesis[^:]*:\s*/i, '');
      elements.push(
        <div className="session-plan-line" key={`follow-${index}`}>
          <span className="session-plan-label session-plan-label-followup">Refined idea</span>
          <span className="session-plan-text">{text}</span>
        </div>
      );
      return;
    }

    if (/^Challenge/i.test(line)) {
      inResolution = false;
      const text = line.replace(/^Challenge[^:]*:\s*/i, '');
      elements.push(
        <div className="session-plan-line" key={`chal-${index}`}>
          <span className="session-plan-label session-plan-label-challenge">Guiding question</span>
          <span className="session-plan-text">{text}</span>
        </div>
      );
      return;
    }

    if (/^Resolution/i.test(line)) {
      inResolution = true;
      pushResolutionHeader();
      return;
    }

    if (/^Takeaway/i.test(line)) {
      inResolution = true;
      const text = line.replace(/^Takeaway[^:]*:\s*/i, '');
      elements.push(
        <div className="session-plan-takeaway" key={`take-${index}`}>
          <span className="session-plan-takeaway-dot">•</span>
          <span className="session-plan-takeaway-text">{text}</span>
        </div>
      );
      return;
    }

    if (inResolution) {
      elements.push(
        <p className="session-plan-resolution-text" key={`res-${index}`}>
          {line}
        </p>
      );
      return;
    }

    elements.push(
      <p className="session-plan-generic-line" key={`gen-${index}`}>
        {line}
      </p>
    );
  });

  return <>{elements}</>;
};

function SessionPlanView({ concept, knowledgeProblem, planText, onRegenerate, loading }) {
  // If there's no plan and we're not loading, nothing to show yet.
  if (!planText && !loading) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(planText);
      alert('Session plan copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text:', err);
      alert('Could not copy to clipboard. Please select and copy manually.');
    }
  };

  return (
    <section style={{ marginTop: '1.25rem', marginBottom: '1rem' }}>
      <h2 style={{ marginBottom: '0.4rem', fontSize: '1.2rem' }}>
        3. Your interactive session plan.
      </h2>

      {concept && (
        <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.15rem' }}>
          Concept: <strong>{concept}</strong>
        </p>
      )}
      {knowledgeProblem && (
        <p style={{ fontSize: '0.85rem', opacity: 0.75, marginBottom: '0.4rem' }}>
          Curiosity question: <em>{knowledgeProblem}</em>
        </p>
      )}

      {loading ? (
        <div className="session-plan-box">Designing your session flow...</div>
      ) : (
        <>
          <div className="session-plan-box">{renderFormattedPlan(planText)}</div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '0.75rem',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}
          >
            <button className="button-secondary" onClick={handleCopy}>
              Copy plan
            </button>
            <button className="button-secondary" onClick={onRegenerate} disabled={loading}>
              Generate another variation
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default SessionPlanView;
