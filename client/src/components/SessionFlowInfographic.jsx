import React from 'react';
import './SessionFlowInfographic.css';

function SessionFlowInfographic() {
  return (
    <section className="sl-flow">
      <h2 className="sl-flow__title">How a Super Lecture Comes Alive</h2>
      <p className="sl-flow__subtitle">
        A visual of how your concept, curiosity questions, and challenges unfold into a lively learning moment.
      </p>

      <div className="sl-flow__legend">
        <div className="sl-flow__legend-item">
          <span className="sl-flow__badge sl-flow__badge--teacher">T</span>
          <span>Teacher move</span>
        </div>
        <div className="sl-flow__legend-item">
          <span className="sl-flow__badge sl-flow__badge--students">S</span>
          <span>Student move</span>
        </div>
      </div>

      <div className="sl-flow__timeline">
        <div className="sl-flow__step sl-flow__step--teacher">
          <div className="sl-flow__step-header">
            <span className="sl-flow__badge sl-flow__badge--teacher">T</span>
            <span className="sl-flow__step-label">Start with a situation</span>
          </div>
          <p className="sl-flow__step-text">
            Teacher sets up a real or surprising scenario tied to the concept, holding theory for later.
          </p>
        </div>

        <div className="sl-flow__arrow">Students react</div>

        <div className="sl-flow__step sl-flow__step--students">
          <div className="sl-flow__step-header">
            <span className="sl-flow__badge sl-flow__badge--students">S</span>
            <span className="sl-flow__step-label">Students guess &amp; explain</span>
          </div>
          <p className="sl-flow__step-text">
            Students offer quick explanations or guesses based on their current understanding.
          </p>
        </div>

        <div className="sl-flow__arrow">Teacher nudges</div>

        <div className="sl-flow__step sl-flow__step--teacher">
          <div className="sl-flow__step-header">
            <span className="sl-flow__badge sl-flow__badge--teacher">T</span>
            <span className="sl-flow__step-label">Nudge &amp; challenge</span>
          </div>
          <p className="sl-flow__step-text">
            Teacher asks follow-up questions, offers counter-examples, or pushes back to stretch reasoning.
          </p>
        </div>

        <div className="sl-flow__arrow">Students refine</div>

        <div className="sl-flow__step sl-flow__step--students">
          <div className="sl-flow__step-header">
            <span className="sl-flow__badge sl-flow__badge--students">S</span>
            <span className="sl-flow__step-label">Refine &amp; connect</span>
          </div>
          <p className="sl-flow__step-text">
            Students revise their explanations, connecting ideas to build a stronger understanding.
          </p>
        </div>

        <div className="sl-flow__arrow sl-flow__arrow--final">Big clarity moment</div>

        <div className="sl-flow__step sl-flow__step--resolution">
          <div className="sl-flow__step-header">
            <span className="sl-flow__badge sl-flow__badge--teacher">T</span>
            <span className="sl-flow__step-label">Name the big takeaway</span>
          </div>
          <p className="sl-flow__step-text">
            Together the class locks in the key idea or model everyone can now apply.
          </p>
        </div>
      </div>

      <p className="sl-flow__footer">
        Super Lectures helps you pre-plan each of these moves: the starting situation, likely student ideas,
        your challenges, and the final clarity moment.
      </p>
    </section>
  );
}

export default SessionFlowInfographic;
