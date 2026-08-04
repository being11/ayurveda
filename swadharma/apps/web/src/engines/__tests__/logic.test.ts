import { describe, it, expect } from 'vitest';
import { evaluateConditions } from '../logic';
import type { Condition } from '../../types/assessment';

describe('evaluateConditions', () => {
  it('returns true when conditions are null', () => {
    expect(evaluateConditions(null, {})).toBe(true);
  });

  it('returns true when conditions are undefined', () => {
    expect(evaluateConditions(undefined, {})).toBe(true);
  });

  it('returns true when conditions array is empty', () => {
    expect(evaluateConditions([], {})).toBe(true);
  });

  it('returns false when a required answer is missing', () => {
    const conditions: Condition[] = [{ questionId: 'q1', value: 'yes' }];
    expect(evaluateConditions(conditions, {})).toBe(false);
  });

  it('returns true when a single condition is met (string answer)', () => {
    const conditions: Condition[] = [{ questionId: 'q1', value: 'yes' }];
    expect(evaluateConditions(conditions, { q1: 'yes' })).toBe(true);
  });

  it('returns false when a single condition is not met (string answer)', () => {
    const conditions: Condition[] = [{ questionId: 'q1', value: 'yes' }];
    expect(evaluateConditions(conditions, { q1: 'no' })).toBe(false);
  });

  it('returns true when a condition is met within an array answer', () => {
    const conditions: Condition[] = [{ questionId: 'q1', value: 'apple' }];
    expect(evaluateConditions(conditions, { q1: ['banana', 'apple', 'orange'] })).toBe(true);
  });

  it('returns false when a condition is not met within an array answer', () => {
    const conditions: Condition[] = [{ questionId: 'q1', value: 'grape' }];
    expect(evaluateConditions(conditions, { q1: ['banana', 'apple', 'orange'] })).toBe(false);
  });

  it('evaluates multiple conditions with AND logic (all true)', () => {
    const conditions: Condition[] = [
      { questionId: 'q1', value: 'yes' },
      { questionId: 'q2', value: 'blue' }
    ];
    expect(evaluateConditions(conditions, { q1: 'yes', q2: 'blue' })).toBe(true);
  });

  it('evaluates multiple conditions with AND logic (one false)', () => {
    const conditions: Condition[] = [
      { questionId: 'q1', value: 'yes' },
      { questionId: 'q2', value: 'blue' }
    ];
    expect(evaluateConditions(conditions, { q1: 'yes', q2: 'red' })).toBe(false);
  });
});
