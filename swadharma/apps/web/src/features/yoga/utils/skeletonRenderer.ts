import type { Keypoint, Pose } from '../types/pose.types';
import * as poseDetection from '@tensorflow-models/pose-detection';

const MIN_KEYPOINT_SCORE = 0.3;

export function drawKeypoints(
  keypoints: readonly Keypoint[],
  ctx: CanvasRenderingContext2D
): void {
  for (const keypoint of keypoints) {
    if (keypoint.score && keypoint.score >= MIN_KEYPOINT_SCORE) {
      ctx.beginPath();
      ctx.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#E8A838'; // Temple Gold
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}

export function drawSkeleton(
  keypoints: readonly Keypoint[],
  ctx: CanvasRenderingContext2D
): void {
  const adjacentKeyPoints = poseDetection.util.getAdjacentPairs(poseDetection.SupportedModels.MoveNet);

  for (const [i, j] of adjacentKeyPoints) {
    if (i === undefined || j === undefined) continue;
    const kp1 = keypoints[i];
    const kp2 = keypoints[j];

    if (!kp1 || !kp2) continue;

    const score1 = kp1.score ?? 0;
    const score2 = kp2.score ?? 0;

    if (score1 >= MIN_KEYPOINT_SCORE && score2 >= MIN_KEYPOINT_SCORE) {
      ctx.beginPath();
      ctx.moveTo(kp1.x, kp1.y);
      ctx.lineTo(kp2.x, kp2.y);
      ctx.strokeStyle = '#1B3A6B'; // Government Blue
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }
}

export function drawPose(
  pose: Pose,
  ctx: CanvasRenderingContext2D
): void {
  if (pose.keypoints) {
    drawSkeleton(pose.keypoints, ctx);
    drawKeypoints(pose.keypoints, ctx);
  }
}
