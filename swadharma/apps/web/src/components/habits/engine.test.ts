// @ts-ignore
import { describe, it, expect } from 'vitest';
import { useHabitStore, HABITS } from '../../lib/habits/engine';

describe('Habit Engine', () => {
  it('has 9 habits', () => {
    expect(HABITS.length).toBe(9);
  });
});
