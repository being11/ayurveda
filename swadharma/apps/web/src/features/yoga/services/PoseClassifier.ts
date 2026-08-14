import type { Point3D, JointAngles, AsanaProfile, PoseScoreResult } from '../types/pose.types';
import type { CorrectionArrow, ArrowDirection } from '../types/feedback.types';
import { calculateAngle, calculateScore } from '../utils/angleCalculator';
import * as poseDetection from '@tensorflow-models/pose-detection';

export class PoseClassifier {
    private readonly profiles: Map<string, AsanaProfile>;

    constructor(profiles: readonly AsanaProfile[]) {
        this.profiles = new Map(profiles.map(p => [p.id, p]));
    }

    public evaluatePose(keypoints: readonly poseDetection.Keypoint[], asanaId: string): PoseScoreResult | null {
        const profile = this.profiles.get(asanaId);
        if (!profile) return null;

        const pts = this.mapToPoints(keypoints);
        if (!pts) return null;

        const right_shoulder = pts['right_shoulder'];
        const right_elbow = pts['right_elbow'];
        const right_wrist = pts['right_wrist'];
        const right_hip = pts['right_hip'];
        const right_knee = pts['right_knee'];
        const right_ankle = pts['right_ankle'];

        if (!right_shoulder || !right_elbow || !right_wrist || !right_hip || !right_knee || !right_ankle) {
           return null;
        }

        const actualAngles: JointAngles = {
            shoulders: calculateAngle(right_elbow, right_shoulder, right_hip),
            elbows: calculateAngle(right_shoulder, right_elbow, right_wrist),
            hips: calculateAngle(right_shoulder, right_hip, right_knee),
            knees: calculateAngle(right_hip, right_knee, right_ankle)
        };

        const jointScores = {
            shoulders: calculateScore(actualAngles.shoulders, profile.idealAngles.shoulders, profile.tolerances.shoulders),
            elbows: calculateScore(actualAngles.elbows, profile.idealAngles.elbows, profile.tolerances.elbows),
            hips: calculateScore(actualAngles.hips, profile.idealAngles.hips, profile.tolerances.hips),
            knees: calculateScore(actualAngles.knees, profile.idealAngles.knees, profile.tolerances.knees)
        };

        const totalScore = (jointScores.shoulders + jointScores.elbows + jointScores.hips + jointScores.knees) / 4;
        const isCorrect = totalScore > 80;

        return {
            asanaId: profile.id,
            overallScore: totalScore,
            jointScores,
            isCorrect,
            feedback: this.generateFeedback(jointScores)
        };
    }

    public generateCorrectionArrows(keypoints: readonly poseDetection.Keypoint[], asanaId: string, result: PoseScoreResult): ReadonlyArray<CorrectionArrow> {
        const profile = this.profiles.get(asanaId);
        if (!profile || result.overallScore >= 80) return [];

        const pts = this.mapToPoints(keypoints);
        if (!pts) return [];

        const arrows: CorrectionArrow[] = [];

        // This is a simplified arrow generation logic based on the lowest scoring joint
        let lowestJoint = 'knees' as keyof JointAngles;
        let lowestScore = result.jointScores.knees;

        for (const [key, score] of Object.entries(result.jointScores)) {
            if (score < lowestScore) {
                lowestScore = score;
                lowestJoint = key as keyof JointAngles;
            }
        }

        const right_shoulder = pts['right_shoulder'];
        const right_elbow = pts['right_elbow'];
        const right_hip = pts['right_hip'];
        const right_knee = pts['right_knee'];

        if (!right_shoulder || !right_elbow || !right_hip || !right_knee) {
           return [];
        }

        let startPoint: Point3D = right_knee;
        let direction: ArrowDirection = 'rotate-clockwise';

        switch (lowestJoint) {
            case 'knees': startPoint = right_knee; break;
            case 'hips': startPoint = right_hip; break;
            case 'elbows': startPoint = right_elbow; break;
            case 'shoulders': startPoint = right_shoulder; break;
        }

        arrows.push({
            id: `correction-${lowestJoint}`,
            direction,
            startX: startPoint.x,
            startY: startPoint.y,
            magnitude: 100 - lowestScore
        });

        return arrows;
    }

    private generateFeedback(scores: Record<keyof JointAngles, number>): readonly string[] {
        const messages: string[] = [];
        if (scores.knees < 80) messages.push("Adjust your knee angle.");
        if (scores.hips < 80) messages.push("Check your hip alignment.");
        if (scores.shoulders < 80) messages.push("Relax and align your shoulders.");
        if (scores.elbows < 80) messages.push("Straighten your arms.");
        return messages;
    }

    private mapToPoints(keypoints: readonly poseDetection.Keypoint[]): Record<string, Point3D & { score?: number }> | null {
        const ptMap: Record<string, Point3D & { score?: number }> = {};
        for (const kp of keypoints) {
            if (kp.name) {
                ptMap[kp.name] = { x: kp.x, y: kp.y, score: kp.score };
            }
        }

        const required = ['right_shoulder', 'right_elbow', 'right_wrist', 'right_hip', 'right_knee', 'right_ankle'];
        for (const req of required) {
            const pt = ptMap[req];
            if (!pt || (pt.score !== undefined && pt.score < 0.3)) return null;
        }

        return ptMap;
    }
}
