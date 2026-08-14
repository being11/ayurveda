import { describe, it, expect, beforeEach } from 'vitest';
import { useAmaStore } from './engine';

describe('Ama Engine', () => {
  beforeEach(() => {
    useAmaStore.getState().resetAssessment();
  });

  it('should have initial Niraama state', () => {
    const { metrics } = useAmaStore.getState();
    expect(metrics.status).toBe('Niraama');
    expect(metrics.score).toBe(0);
  });

  it('should calculate Maha-Saama status for severe symptoms', () => {
    const { setSymptoms, calculateMetrics } = useAmaStore.getState();
    setSymptoms({
      tongueCoating: 'thick',
      heaviness: 'severe',
      foulOdor: 'severe',
      sluggishness: 'severe',
      indigestion: 'severe',
      lethargy: 'severe',
    });
    calculateMetrics();

    const { metrics } = useAmaStore.getState();
    expect(metrics.status).toBe('Maha-Saama');
    expect(metrics.score).toBe(100);
  });
});
