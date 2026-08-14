import type { Point3D } from '../types/pose.types';

/**
 * Calculates the angle (in degrees) formed by three points (A, B, C) where B is the vertex.
 */
export function calculateAngle(p1: Point3D, p2: Point3D, p3: Point3D): number {
  const radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);

  if (angle > 180.0) {
      angle = 360 - angle;
  }
  return angle;
}

/**
 * Normalizes an angle score 0-100 based on difference and tolerance.
 */
export function calculateScore(actual: number, ideal: number, tolerance: number): number {
    const diff = Math.abs(actual - ideal);
    if (diff <= tolerance) {
        return Math.max(0, 100 - (diff / tolerance) * 100);
    }
    // Exponential drop-off outside of tolerance, or strictly 0. We'll use strict 0 to map linear logic in prompt.
    return 0;
}
