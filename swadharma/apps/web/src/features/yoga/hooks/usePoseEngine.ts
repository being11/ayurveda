import { useState, useCallback, useRef, useEffect } from 'react';
import type { CorrectionArrow } from '../types/feedback.types';
import { PoseClassifier } from '../services/PoseClassifier';
import { drawPose } from '../utils/skeletonRenderer';

// Mock asana profiles for initialization
const MOCK_PROFILES = [
  {
    id: 'asana-1',
    name: 'Mountain Pose',
    idealAngles: { shoulders: 180, elbows: 180, hips: 180, knees: 180 },
    tolerances: { shoulders: 15, elbows: 15, hips: 15, knees: 15 }
  }
];

import type { IPoseDetectorService } from '../types/pose.types';

export function usePoseEngine(
   status: string,
   detectorService: React.MutableRefObject<IPoseDetectorService | null>,
   videoRef: React.RefObject<HTMLVideoElement | null>,
   canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [arrows, setArrows] = useState<ReadonlyArray<CorrectionArrow>>([]);
  const [videoDims, setVideoDims] = useState({ width: 640, height: 480 });
  const requestRef = useRef<number>(0);
  const classifierRef = useRef(new PoseClassifier(MOCK_PROFILES));

  const renderLoop = useCallback(async () => {
    if (status !== 'ready' || !detectorService.current || !videoRef.current || !canvasRef.current || videoRef.current.readyState < 2) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Track intrinsic dimension to pass down to SVG viewbox
    if (video.videoWidth !== videoDims.width || video.videoHeight !== videoDims.height) {
        setVideoDims({ width: video.videoWidth || 640, height: video.videoHeight || 480 });
    }

    const pose = await detectorService.current.estimatePose(video);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (pose) {
       drawPose(pose, ctx);
       if (pose.keypoints) {
         const scoreResult = classifierRef.current.evaluatePose(pose.keypoints, 'asana-1');
         if (scoreResult) {
            setCurrentScore(scoreResult.overallScore);
            setArrows(classifierRef.current.generateCorrectionArrows(pose.keypoints, 'asana-1', scoreResult));
         } else {
            setCurrentScore(null);
            setArrows([]);
         }
       }
    } else {
       setCurrentScore(null);
       setArrows([]);
    }
  }, [status, detectorService, videoRef, canvasRef, videoDims]);

  useEffect(() => {
    if (status !== 'ready') return;
    let isRendering = true;

    const loop = async () => {
        if (!isRendering) return;
        await renderLoop();
        requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      isRendering = false;
      cancelAnimationFrame(requestRef.current);
    };
  }, [status, renderLoop]);

  return { currentScore, arrows, videoDims };
}
