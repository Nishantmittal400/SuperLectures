/**
 * App.jsx
 * -------
 * The "brain" of the frontend.
 *
 * Responsibilities:
 *  - Hold state for:
 *      - concept
 *      - audience
 *      - knowledgeProblems[]
 *      - selected knowledge problem index
 *      - sessionPlanText
 *      - loading & error flags
 *  - Orchestrate API calls to:
 *      - /api/knowledge-problems
 *      - /api/session-plan
 *  - Pass data + callbacks down into components.
 */

import React, { useRef, useState } from 'react';
import Layout from './components/Layout';
import HeroSection from './components/HeroSection';
import FrameworkExplainer from './components/FrameworkExplainer';
import ClassroomAssessmentDemo from './components/ClassroomAssessmentDemo';
import ConceptForm from './components/ConceptForm';
import KnowledgeProblemsList from './components/KnowledgeProblemsList';
import SessionPlanView from './components/SessionPlanView';
import SessionFlowInfographic from './components/SessionFlowInfographic';
import { fetchKnowledgeProblems, fetchSessionPlan } from './lib/api';

function App() {
  // Core input state
  const [concept, setConcept] = useState('');
  const [audience, setAudience] = useState('');
  const [showAssessmentDemo, setShowAssessmentDemo] = useState(false);

  // Data from backend
  const [knowledgeProblems, setKnowledgeProblems] = useState([]);
  const [selectedKPIndex, setSelectedKPIndex] = useState(null);
  const [sessionPlanText, setSessionPlanText] = useState('');
  const [customCuriosityQuestion, setCustomCuriosityQuestion] = useState('');
  const [activeCuriosityQuestionForPlan, setActiveCuriosityQuestionForPlan] = useState('');

  // UI flags
  const [loadingKP, setLoadingKP] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Ref for smooth-scrolling from Hero to the main card
  const featureBlockRef = useRef(null);

  const handleShowAssessmentDemo = () => {
    setShowAssessmentDemo(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMain = () => {
    setShowAssessmentDemo(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const scrollToFeature = () => {
    featureBlockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleGenerateKnowledgeProblems = async () => {
    if (!concept.trim()) return;

    setErrorMessage('');
    setLoadingKP(true);
    setKnowledgeProblems([]);
    setSelectedKPIndex(null);
    setSessionPlanText('');

    try {
      const audienceToUse = audience.trim() || 'higher-ed';
      const problems = await fetchKnowledgeProblems(concept.trim(), audienceToUse);
      setKnowledgeProblems(problems);

      // Optionally preselect the first one, but keep it manual for now.
      if (problems.length === 1) {
        setSelectedKPIndex(0);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(
        'Something went wrong while generating curiosity questions. Please try again in a moment.'
      );
    } finally {
      setLoadingKP(false);
    }
  };

  const handleSelectKP = (index) => {
    setSelectedKPIndex(index);
    setSessionPlanText(''); // Clear old plan so user understands they need to regenerate
  };

  const selectedKnowledgeProblem =
    selectedKPIndex !== null ? knowledgeProblems[selectedKPIndex] : '';

  const handleGenerateSessionPlan = async () => {
    if (!concept.trim()) {
      alert('Please enter a concept first.');
      return;
    }

    const trimmedCustomQuestion = customCuriosityQuestion.trim();
    const hasCustomQuestion = trimmedCustomQuestion.length > 0;
    const hasSelectedQuestion = Boolean(selectedKnowledgeProblem?.trim());

    if (!hasCustomQuestion && !hasSelectedQuestion) {
      alert('Pick a curiosity question or type your own.');
      return;
    }

    const effectiveQuestion = hasCustomQuestion ? trimmedCustomQuestion : selectedKnowledgeProblem;

    setErrorMessage('');
    setLoadingPlan(true);
    setSessionPlanText('');
    setActiveCuriosityQuestionForPlan(effectiveQuestion);

    try {
      const audienceToUse = audience.trim() || 'higher-ed';
      const planText = await fetchSessionPlan({
        concept: concept.trim(),
        chosenQuestion: effectiveQuestion,
        audience: audienceToUse
      });
      setSessionPlanText(planText);
    } catch (err) {
      console.error(err);
      setErrorMessage('Something went wrong while generating your session plan. Please try again.');
    } finally {
      setLoadingPlan(false);
    }
  };

  const handleRegeneratePlan = async () => {
    await handleGenerateSessionPlan();
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <Layout>
      {showAssessmentDemo ? (
        <ClassroomAssessmentDemo onBackToMain={handleBackToMain} />
      ) : (
        <>
          <HeroSection
            onTryNow={scrollToFeature}
            onAssessClassroom={handleShowAssessmentDemo}
          />
          <FrameworkExplainer />
          <SessionFlowInfographic />

          <div ref={featureBlockRef}>
            <ConceptForm
              concept={concept}
              onConceptChange={setConcept}
              audience={audience}
              onAudienceChange={setAudience}
              onGenerate={handleGenerateKnowledgeProblems}
              disabled={loadingKP}
            />

            {errorMessage && (
              <p style={{ marginTop: '0.75rem', color: '#ffb3b3', fontSize: '0.85rem' }}>
                {errorMessage}
              </p>
            )}

            <KnowledgeProblemsList
              concept={concept}
              problems={knowledgeProblems}
              selectedIndex={selectedKPIndex}
              onSelect={handleSelectKP}
              onGeneratePlan={handleGenerateSessionPlan}
              loadingPlan={loadingPlan}
              customCuriosityQuestion={customCuriosityQuestion}
              onCustomCuriosityQuestionChange={setCustomCuriosityQuestion}
            />

            <SessionPlanView
              concept={concept}
              knowledgeProblem={activeCuriosityQuestionForPlan}
              planText={sessionPlanText}
              onRegenerate={handleRegeneratePlan}
              loading={loadingPlan}
            />
          </div>
        </>
      )}
    </Layout>
  );
}

export default App;
