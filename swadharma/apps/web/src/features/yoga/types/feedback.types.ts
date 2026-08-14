export type ArrowDirection = 'up' | 'down' | 'left' | 'right' | 'rotate-clockwise' | 'rotate-counter-clockwise';

export interface CorrectionArrow {
  readonly id: string;
  readonly direction: ArrowDirection;
  readonly startX: number;
  readonly startY: number;
  readonly magnitude: number;
}

export type FeedbackState = 'idle' | 'correcting' | 'celebrating';

export interface PoseFeedbackPayload {
  readonly score: number;
  readonly state: FeedbackState;
  readonly message: string;
  readonly arrows: ReadonlyArray<CorrectionArrow>;
}

export interface ISpeechService {
  speak(text: string, priority?: boolean): void;
  cancel(): void;
}
