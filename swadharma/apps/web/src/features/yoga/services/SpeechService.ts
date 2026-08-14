import type { ISpeechService } from '../types/feedback.types';

export class SpeechService implements ISpeechService {
  private lastSpokenText: string = '';
  private lastSpokenTime: number = 0;
  private readonly THROTTLE_MS = 3000; // 3 seconds

  public speak(text: string, priority: boolean = false): void {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return;
    }

    const now = Date.now();
    const timeSinceLastSpoken = now - this.lastSpokenTime;

    // Prevent spamming the same phrase
    if (!priority && text === this.lastSpokenText && timeSinceLastSpoken < this.THROTTLE_MS) {
       return;
    }

    // Cancel currently speaking if priority
    if (priority) {
      window.speechSynthesis.cancel();
    }

    // Do not queue if already speaking and not priority
    if (!priority && window.speechSynthesis.speaking) {
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    // Setting defaults for a calm, instructive voice
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);

    this.lastSpokenText = text;
    this.lastSpokenTime = now;
  }

  public cancel(): void {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      this.lastSpokenText = '';
      this.lastSpokenTime = 0;
    }
  }
}

export const speechService = new SpeechService();
