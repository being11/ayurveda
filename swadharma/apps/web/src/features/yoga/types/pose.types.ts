export type JointName = 'left_shoulder' | 'right_shoulder' | 'left_elbow' | 'right_elbow' | 'left_hip' | 'right_hip' | 'left_knee' | 'right_knee';

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface Point3D {
  readonly x: number;
  readonly y: number;
  readonly z?: number;
  readonly visibility?: number;
}

export interface Keypoint extends Point {
  readonly score?: number;
  readonly name?: string;
}

export interface Pose {
  readonly keypoints: readonly Keypoint[];
  readonly score?: number;
}

export type PoseDetectorStatus = 'uninitialized' | 'loading' | 'ready' | 'error';

export interface IPoseDetectorService {
  initialize(): Promise<void>;
  estimatePose(videoElement: HTMLVideoElement): Promise<Pose | null>;
  dispose(): void;
}

export interface JointAngles {
  readonly shoulders: number;
  readonly elbows: number;
  readonly hips: number;
  readonly knees: number;
}

export interface AsanaProfile {
  readonly id: string;
  readonly name: string;
  readonly idealAngles: JointAngles;
  readonly tolerances: JointAngles;
}

export interface PoseScoreResult {
  readonly asanaId: string;
  readonly overallScore: number;
  readonly jointScores: Record<keyof JointAngles, number>;
  readonly isCorrect: boolean;
  readonly feedback: readonly string[];
}
