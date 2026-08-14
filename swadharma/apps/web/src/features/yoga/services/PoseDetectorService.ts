import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl'; // Ensure WebGL backend is registered
import type { IPoseDetectorService, Pose } from '../types/pose.types';

export class PoseDetectorService implements IPoseDetectorService {
  private detector: poseDetection.PoseDetector | null = null;
  private isInitializing: boolean = false;

  public async initialize(): Promise<void> {
    if (this.detector || this.isInitializing) {
      return;
    }

    this.isInitializing = true;
    try {
      // Ensure backend is ready
      await tf.ready();

      const detectorConfig: poseDetection.MoveNetModelConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        enableSmoothing: true
      };

      this.detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        detectorConfig
      );
    } catch (error) {
      console.error('Failed to initialize PoseDetectorService:', error);
      throw error;
    } finally {
      this.isInitializing = false;
    }
  }

  public async estimatePose(videoElement: HTMLVideoElement): Promise<Pose | null> {
    if (!this.detector) {
      return null;
    }

    try {
      const poses = await this.detector.estimatePoses(videoElement, {
        maxPoses: 1,
        flipHorizontal: false
      });

      if (poses.length > 0) {
        // We only care about the first pose since we're using SINGLEPOSE_LIGHTNING
        const rawPose = poses[0];

        if (!rawPose) return null;

        return {
          keypoints: rawPose.keypoints,
          score: rawPose.score
        };
      }
      return null;
    } catch (error) {
      console.error('Error estimating pose:', error);
      return null;
    }
  }

  public dispose(): void {
    if (this.detector) {
      this.detector.dispose();
      this.detector = null;
    }

    // Attempt memory cleanup
    const numTensors = tf.memory().numTensors;
    if (numTensors > 0) {
       console.warn(`Memory cleanup warning: ${numTensors} tensors remaining.`);
    }
  }
}
