export interface AudioOptions {
  lang?: string | undefined;
  voiceName?: string | undefined;
  rate?: number | undefined;
  pitch?: number | undefined;
  volume?: number | undefined;
}

export interface AudioService {
  speak(text: string, options?: AudioOptions): void;
  stop(): void;
  isSupported(): boolean;
}

export class WebSpeechAudioService implements AudioService {
  isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof SpeechSynthesisUtterance !== 'undefined'
    );
  }

  speak(text: string, options: AudioOptions = {}): void {
    if (!this.isSupported() || !text.trim()) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang ?? 'en-US';
    if (options.rate !== undefined) utterance.rate = options.rate;
    if (options.pitch !== undefined) utterance.pitch = options.pitch;
    if (options.volume !== undefined) utterance.volume = options.volume;

    if (options.voiceName) {
      const voice = window.speechSynthesis
        .getVoices()
        .find((availableVoice) => availableVoice.name === options.voiceName);
      if (voice) utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  }

  stop(): void {
    if (this.isSupported()) window.speechSynthesis.cancel();
  }
}
