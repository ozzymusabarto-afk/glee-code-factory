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
    // Tom suavemente masculino e acolhedor (0.95 a 1.0)
    utterance.pitch = options.pitch ?? 0.95;
    if (options.volume !== undefined) utterance.volume = options.volume;

    const availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length > 0) {
      if (options.voiceName) {
        const customVoice = availableVoices.find((v) => v.name === options.voiceName);
        if (customVoice) utterance.voice = customVoice;
      } else {
        // Voz masculina natural do Alex (busca vozes masculinas jovens/naturais em inglês)
        const preferredMaleVoices = [
          'Microsoft Guy Online (Natural)',
          'Microsoft Christopher Online (Natural)',
          'Microsoft Eric Online (Natural)',
          'Google US English Male',
          'Microsoft David - English (United States)',
          'Microsoft Mark - English (United States)',
          'Alex', // Voz nativa masculina de alta qualidade no macOS/iOS
          'Daniel',
          'Oliver',
        ];

        let selectedVoice: SpeechSynthesisVoice | undefined;
        for (const preferred of preferredMaleVoices) {
          selectedVoice = availableVoices.find((v) => v.name.includes(preferred));
          if (selectedVoice) break;
        }

        // Fallback: qualquer voz em inglês que contenha indicação masculina
        if (!selectedVoice) {
          selectedVoice = availableVoices.find(
            (v) => v.lang.startsWith('en') && /male|david|guy|mark|alex|christopher|eric|george|john/i.test(v.name)
          );
        }

        // Fallback geral em inglês
        if (!selectedVoice) {
          selectedVoice = availableVoices.find((v) => v.lang.startsWith('en'));
        }

        if (selectedVoice) utterance.voice = selectedVoice;
      }
    }

    window.speechSynthesis.speak(utterance);
  }

  stop(): void {
    if (this.isSupported()) window.speechSynthesis.cancel();
  }
}
