import { useState, useEffect, useCallback } from 'react';
import type { PoseFeedbackPayload, FeedbackState, CorrectionArrow } from '../types/feedback.types';
import { speechService } from '../services/SpeechService';

export function usePoseFeedback(score: number | null, arrows: ReadonlyArray<CorrectionArrow> = []) {
  const [feedback, setFeedback] = useState<PoseFeedbackPayload>({
    score: 0,
    state: 'idle',
    message: '',
    arrows: []
  });

  const analyzeScore = useCallback((currentScore: number | null) => {
    if (currentScore === null) {
      setFeedback({ score: 0, state: 'idle', message: '', arrows: [] });
      return;
    }

    let nextState: FeedbackState = 'idle';
    let nextMessage = '';
    let nextArrows: ReadonlyArray<CorrectionArrow> = [];

    if (currentScore > 90) {
      nextState = 'celebrating';
      nextMessage = 'Perfect form! Hold this pose.';
      speechService.speak(nextMessage, false);
    } else if (currentScore < 80) {
      nextState = 'correcting';
      nextMessage = 'Adjust your posture.';
      nextArrows = arrows;
      speechService.speak(nextMessage, false);
    } else {
      nextState = 'idle';
      nextMessage = 'Good. Hold steady.';
    }

    setFeedback({
      score: currentScore,
      state: nextState,
      message: nextMessage,
      arrows: nextArrows
    });
  }, [arrows]);

  useEffect(() => {
    const timer = setTimeout(() => {
       analyzeScore(score);
    }, 0);
    return () => clearTimeout(timer);
  }, [score, analyzeScore]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
     return () => {
         speechService.cancel();
     };
  }, []);

  return feedback;
}
