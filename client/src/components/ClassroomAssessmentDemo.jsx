/**
 * ClassroomAssessmentDemo.jsx
 * ---------------------------
 * DEMO VIEW for the "Assess the Classroom" feature.
 *
 * - Shows what the analysis could look like once audio analysis is wired.
 * - Uses static mock data to simulate the pipeline and output.
 * - Avoids research jargon (no IRE / OHCR / IAM labels).
 */

import React from 'react';

function ClassroomAssessmentDemo({ onBackToMain }) {
  const summary = {
    title: 'Sample Class: Understanding Linear Relationships',
    duration: '42 minutes',
    participants: {
      teacher: 1,
      students: 28
    },
    speakingTime: {
      teacherPercent: 62,
      studentsPercent: 38
    },
    questionsAsked: 31,
    studentVoicesHeard: 17
  };

  const lessonFlow = [
    {
      id: 1,
      label: 'Kick-off moment',
      description: 'Teacher starts with a simple story about comparing mobile data plans.',
      percent: 10
    },
    {
      id: 2,
      label: 'Student thinking phase',
      description: 'Students share guesses and examples about when two lines can cross.',
      percent: 35
    },
    {
      id: 3,
      label: 'Teacher guiding questions',
      description: 'Teacher asks targeted questions pushing students to think about slope.',
      percent: 30
    },
    {
      id: 4,
      label: 'Clarity & wrap-up',
      description:
        'Teacher connects the discussion to the idea of linear equations and real-life trade-offs.',
      percent: 25
    }
  ];

  const interactionPatterns = [
    {
      label: 'Quick check-ins',
      description: 'Short question → brief answer → quick confirmation',
      count: 14
    },
    {
      label: 'Deeper mini-dialogues',
      description: 'Back-and-forth for 3–5 turns on the same idea',
      count: 9
    },
    {
      label: 'Extended explorations',
      description: 'Long multi-voice exchanges where students build on each other',
      count: 4
    }
  ];

  const momentTypes = [
    {
      key: 'startingPoints',
      label: 'Starting points',
      description: 'Teacher puts a concrete situation or puzzle on the table.',
      count: 6
    },
    {
      key: 'studentIdeas',
      label: 'Student idea moments',
      description: 'Students share their guesses, rules, or explanations.',
      count: 19
    },
    {
      key: 'guidingQuestions',
      label: 'Guiding questions',
      description: 'Teacher asks questions that stretch or sharpen student thinking.',
      count: 12
    },
    {
      key: 'clarityMoments',
      label: 'Clarity moments',
      description: 'Teacher ties things together into a clear explanation or rule.',
      count: 5
    }
  ];

  const depthOfLearning = [
    {
      level: 1,
      label: 'Sharing quick thoughts',
      percent: 28,
      description: 'Students give short one-line answers or opinions.'
    },
    {
      level: 2,
      label: 'Building on each other',
      percent: 24,
      description: 'Students refer to what others said and add a small twist.'
    },
    {
      level: 3,
      label: 'Explaining why',
      percent: 22,
      description: 'Students give reasons, not just answers.'
    },
    {
      level: 4,
      label: 'Connecting ideas',
      percent: 16,
      description: 'Students link two or more ideas or examples together.'
    },
    {
      level: 5,
      label: 'Big-picture insights',
      percent: 10,
      description: 'Students generalise, compare cases, or state a principle.'
    }
  ];

  const dialogueSnippet = [
    {
      speaker: 'Teacher',
      roleLabel: 'Kick-off moment',
      text: "Imagine two different mobile plans. One gives you 1GB per day, the other gives you 2GB but costs more. How could we compare them fairly?"
    },
    {
      speaker: 'Student A',
      roleLabel: 'Student idea',
      text: 'We could see how much total data we get in a month?'
    },
    {
      speaker: 'Teacher',
      roleLabel: 'Guiding question',
      text: 'Nice start. But what if one plan charges differently each day? How could we keep track of that change?'
    },
    {
      speaker: 'Student B',
      roleLabel: 'Refined idea',
      text: 'Maybe we draw a graph that shows how data used and money spent are related?'
    },
    {
      speaker: 'Teacher',
      roleLabel: 'Clarity moment',
      text: 'Exactly. That graph is what we call a linear relationship: as one quantity changes, the other changes at a steady rate.'
    }
  ];

  const improvementIdeas = [
    'Invite one or two quieter students to restate a peer’s idea in their own words.',
    'Turn one “quick check-in” into a deeper mini-dialogue by asking “why do you think so?” to at least three students.',
    'End each major phase with a one-line takeaway that students can write in their own notebooks.',
    'Use a quick pair-talk moment before cold-calling, so more students mentally rehearse their answer.'
  ];

  const totalMoments = momentTypes.reduce((sum, m) => sum + m.count, 0);

  return (
    <div className="max-width" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <section style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>Classroom Assessment (Demo)</h1>
        <p style={{ maxWidth: 620, fontSize: '0.95rem', opacity: 0.85 }}>
          This is a simulated report showing how Super Lectures could analyse a recorded class.
          The numbers and labels below are examples only, designed to make the process visible
          without using real classroom audio.
        </p>
        {onBackToMain && (
          <button
            type="button"
            className="glass-button"
            style={{
              marginTop: '0.75rem',
              padding: '0.45rem 1rem',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.65)',
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer'
            }}
            onClick={onBackToMain}
          >
            ← Back to main page
          </button>
        )}
      </section>

      <section className="glass-card" style={{ marginBottom: '1rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '1.1rem' }}>
          1. Session snapshot
        </h2>
        <p style={{ fontSize: '0.88rem', opacity: 0.8, marginBottom: '0.7rem' }}>
          A quick overview of who spoke, for how long, and how interactive the session felt.
        </p>

        <div className="flex-row" style={{ flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ minWidth: 220 }}>
            <div className="ca-label">Class title</div>
            <div className="ca-value">{summary.title}</div>
            <div className="ca-label" style={{ marginTop: '0.5rem' }}>
              Duration
            </div>
            <div className="ca-value">{summary.duration}</div>
          </div>

          <div style={{ minWidth: 220 }}>
            <div className="ca-label">Participants</div>
            <div className="ca-value">
              {summary.participants.teacher} teacher · {summary.participants.students} students
            </div>
            <div className="ca-label" style={{ marginTop: '0.5rem' }}>
              Unique student voices
            </div>
            <div className="ca-value">{summary.studentVoicesHeard}</div>
          </div>

          <div style={{ flex: 1, minWidth: 240 }}>
            <div className="ca-label">Speaking time</div>
            <div className="ca-bar-wrapper">
              <div
                className="ca-bar-segment ca-bar-teacher"
                style={{ width: `${summary.speakingTime.teacherPercent}%` }}
              >
                <span>Teacher {summary.speakingTime.teacherPercent}%</span>
              </div>
              <div
                className="ca-bar-segment ca-bar-students"
                style={{ width: `${summary.speakingTime.studentsPercent}%` }}
              >
                <span>Students {summary.speakingTime.studentsPercent}%</span>
              </div>
            </div>
            <div className="ca-label" style={{ marginTop: '0.5rem' }}>
              Questions asked
            </div>
            <div className="ca-value">{summary.questionsAsked}</div>
          </div>
        </div>
      </section>

      <section className="glass-card" style={{ marginBottom: '1rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '1.1rem' }}>
          2. Flow of the lesson
        </h2>
        <p style={{ fontSize: '0.88rem', opacity: 0.8, marginBottom: '0.7rem' }}>
          The class naturally moves through phases: setting up a situation, hearing student ideas,
          asking guiding questions, and landing on a clear takeaway.
        </p>

        <div className="ca-flow-timeline">
          {lessonFlow.map((phase, idx) => (
            <div key={phase.id} className="ca-flow-step">
              <div className="ca-flow-dot" />
              {idx !== lessonFlow.length - 1 && <div className="ca-flow-line" />}
              <div className="ca-flow-card">
                <div className="ca-flow-label">{phase.label}</div>
                <div className="ca-flow-description">{phase.description}</div>
                <div className="ca-flow-percent">{phase.percent}% of class time</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card" style={{ marginBottom: '1rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '1.1rem' }}>
          3. Question–answer patterns
        </h2>
        <p style={{ fontSize: '0.88rem', opacity: 0.8, marginBottom: '0.7rem' }}>
          Not every question works the same way. Here’s how often the class fell into different
          back-and-forth patterns.
        </p>

        <div className="ca-grid">
          {interactionPatterns.map((item) => (
            <div key={item.label} className="ca-card">
              <div className="ca-card-title">{item.label}</div>
              <div className="ca-card-description">{item.description}</div>
              <div className="ca-chip-count">{item.count} times</div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card" style={{ marginBottom: '1rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '1.1rem' }}>
          4. Types of moments in the class
        </h2>
        <p style={{ fontSize: '0.88rem', opacity: 0.8, marginBottom: '0.7rem' }}>
          A good lesson balances starting points, student ideas, guiding questions, and clarity
          moments. This shows how often each of those appeared.
        </p>

        <div className="ca-grid">
          {momentTypes.map((m) => {
            const percent = Math.round((m.count / totalMoments) * 100);
            return (
              <div key={m.key} className="ca-card">
                <div className="ca-card-title">{m.label}</div>
                <div className="ca-card-description">{m.description}</div>
                <div className="ca-moment-bar-wrapper">
                  <div
                    className="ca-moment-bar-fill"
                    style={{ width: `${Math.max(percent, 8)}%` }}
                  />
                </div>
                <div className="ca-chip-count">
                  {m.count} moments · {percent}%
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="glass-card" style={{ marginBottom: '1rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '1.1rem' }}>
          5. Depth of learning moves
        </h2>
        <p style={{ fontSize: '0.88rem', opacity: 0.8, marginBottom: '0.7rem' }}>
          Not all participation is equal. This is how the class distributed across different levels
          of depth — from quick answers to big-picture insights.
        </p>

        <div className="ca-depth-bar">
          {depthOfLearning.map((d) => (
            <div
              key={d.level}
              className="ca-depth-segment"
              style={{ flexBasis: `${d.percent}%`, flexGrow: d.percent }}
            >
              <div className="ca-depth-label">{d.label}</div>
              <div className="ca-depth-percent">{d.percent}%</div>
            </div>
          ))}
        </div>

        <div className="ca-depth-legend">
          {depthOfLearning.map((d) => (
            <div key={d.level} className="ca-depth-legend-item">
              <div className="ca-depth-legend-dot" />
              <div>
                <div className="ca-depth-legend-title">
                  Level {d.level}: {d.label}
                </div>
                <div className="ca-depth-legend-description">{d.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card" style={{ marginBottom: '1rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '1.1rem' }}>
          6. One example exchange
        </h2>
        <p style={{ fontSize: '0.88rem', opacity: 0.8, marginBottom: '0.7rem' }}>
          Here’s a small slice of the conversation, with each turn tagged to show its role in the
          learning journey.
        </p>

        <div className="ca-snippet">
          {dialogueSnippet.map((turn, idx) => (
            <div key={idx} className="ca-snippet-turn">
              <div className="ca-snippet-header">
                <span className="ca-snippet-speaker">{turn.speaker}</span>
                <span className="ca-snippet-role">{turn.roleLabel}</span>
              </div>
              <div className="ca-snippet-text">“{turn.text}”</div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card">
        <h2 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '1.1rem' }}>
          7. If this were your class, we’d suggest…
        </h2>
        <p style={{ fontSize: '0.88rem', opacity: 0.8, marginBottom: '0.7rem' }}>
          These are the kinds of small, concrete moves Super Lectures could recommend based on your
          own class recording.
        </p>

        <ul className="ca-improvements-list">
          {improvementIdeas.map((idea, idx) => (
            <li key={idx}>{idea}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ClassroomAssessmentDemo;
