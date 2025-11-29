/**
 * HeroSection.jsx
 * ---------------
 * The top "marketing" hero:
 * - Communicates the value proposition.
 * - Has a single CTA that scrolls down to the interactive feature.
 *
 * It receives an onTryNow callback from App,
 * which scrolls the user to the main feature block.
 */

import React from 'react';
import Logo from '/super-lectures-logo.svg';

function HeroSection({ onTryNow, onAssessClassroom }) {
  return (
    <section style={{ paddingTop: '2rem', paddingBottom: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <img src={Logo} alt="Super Lectures logo" style={{ height: '60px', marginBottom: '0.8rem' }} />
        <div className="brand-badge">
          Super Lectures <span className="brand-tagline">— Classroom thinking redesigned.</span>
        </div>
        <h1
          style={{
            fontSize: '2.35rem',
            lineHeight: 1.1,
            marginBottom: '0.75rem',
            letterSpacing: '0.02em'
          }}
        >
          Create the world’s most engaging session plan.
          <br />
          <span style={{ fontWeight: 400, fontSize: '1.9rem', opacity: 0.9 }}>
            Backed by research. Generated in seconds.
          </span>
        </h1>

        <p style={{ maxWidth: 580, fontSize: '0.98rem', opacity: 0.85, marginBottom: '1rem' }}>
          You bring the concept. We design the flow: start with a real situation, invite student ideas,
          ask guiding questions, and land a clear takeaway that keeps your students thinking.
        </p>

        <div
          className="flex-row"
          style={{ alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}
        >
          <button className="button-primary" onClick={onTryNow}>
            Try it now
            <span>⚡</span>
          </button>
          <button className="button-secondary" onClick={onTryNow}>
            See a sample session
          </button>
          {onAssessClassroom && (
            <button className="button-secondary" onClick={onAssessClassroom} type="button">
              ASSESS THE CLASSROOM
            </button>
          )}
        </div>
      </div>

      <p style={{ fontSize: '0.8rem', opacity: 0.65, maxWidth: 480 }}>
        No login. No storage. Just type a concept, pick a curiosity question, and watch a complete
        session flow appear.
      </p>
    </section>
  );
}

export default HeroSection;
