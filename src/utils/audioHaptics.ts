// Procedural Web Audio API Synthesizer for Cyber Haptics (Zero External Assets)
class AudioHapticsEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private listeners: ((active: boolean) => void)[] = [];

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public subscribe(listener: (active: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private triggerPulse() {
    this.listeners.forEach(l => l(true));
    setTimeout(() => {
      this.listeners.forEach(l => l(false));
    }, 120);
  }

  // Soft futuristic click
  playClick() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
      this.triggerPulse();
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // High-frequency hover blip
  playHover() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
      this.triggerPulse();
    } catch {
      // Fallback
    }
  }

  // Rapid mechanical typewriter cyber blip for AI response streaming
  playTyping() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800 + Math.random() * 400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.008, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.015);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.015);
      this.triggerPulse();
    } catch {
      // Fallback
    }
  }

  // Celebration chime when RSVP is confirmed
  playSuccess() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = this.ctx!.currentTime + idx * 0.07;
        gain.gain.setValueAtTime(0.06, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
      this.triggerPulse();
    } catch {
      // Fallback
    }
  }
  // Cinematic 3D chapter warp sound effect
  playWarp() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.35);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
      this.triggerPulse();
    } catch {
      // Fallback
    }
  }

  // Ambient synth cosmic pad for 3D Story Universe
  private ambientOscs: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;
  public isAmbientPlaying: boolean = false;

  toggleAmbientDrone(forceState?: boolean): boolean {
    if (forceState !== undefined) {
      if (forceState && !this.isAmbientPlaying) this.startAmbientDrone();
      else if (!forceState && this.isAmbientPlaying) this.stopAmbientDrone();
      return this.isAmbientPlaying;
    }
    if (this.isAmbientPlaying) {
      this.stopAmbientDrone();
    } else {
      this.startAmbientDrone();
    }
    return this.isAmbientPlaying;
  }

  private startAmbientDrone() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      this.stopAmbientDrone();

      const baseFreqs = [55, 110, 165, 220]; // A1, A2, E3, A3 ambient fifths
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.025, this.ctx.currentTime + 2);
      this.ambientGain.connect(this.ctx.destination);

      baseFreqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.value = freq + (Math.random() - 0.5) * 1.5;
        osc.connect(this.ambientGain!);
        osc.start();
        this.ambientOscs.push(osc);
      });

      this.isAmbientPlaying = true;
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  private stopAmbientDrone() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.ambientOscs.forEach(o => {
            try { o.stop(); o.disconnect(); } catch {}
          });
          this.ambientOscs = [];
          this.ambientGain?.disconnect();
          this.ambientGain = null;
        }, 500);
      } catch {
        this.ambientOscs = [];
        this.ambientGain = null;
      }
    }
    this.isAmbientPlaying = false;
  }
}

export const haptics = new AudioHapticsEngine();
