/**
 * Enhanced Audio Engine for Sumit's Portfolio
 * Web Audio API Synthesis + Live Streaming Engine + Visualizer Analyzer
 * 100% Offline Capable & Instant Feedback
 */
class AmbientPlayer {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.analyser = null;
    this.activeNodes = [];
    this.audioElement = null;
    this.audioSourceNode = null;
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.volume = 0.6;
    this.isShuffle = false;
    this.isRepeat = true;
    this.currentTime = 0;
    this.duration = 240; // Simulated or real duration in seconds
    this.timerId = null;
    this.listeners = [];

    this.tracks = [
      {
        id: 'lofi-study',
        title: 'Late Night Study',
        artist: 'Sumit • Chillhop Beats',
        genre: 'Lofi / Rhodes / Vinyl',
        duration: '3:45',
        durationSec: 225,
        bitrate: '320 kbps • 48 kHz',
        type: 'synth'
      },
      {
        id: 'aero-nostalgia',
        title: 'Windows 7 Aero Nostalgia',
        artist: 'Sumit • Glass Ambience',
        genre: 'Aero Reverb / Shimmer',
        duration: '4:12',
        durationSec: 252,
        bitrate: 'Flac 24-bit • Lossless',
        type: 'synth'
      },
      {
        id: 'cyber-focus',
        title: 'Cyberpunk 1984 Focus',
        artist: 'Sumit • Analog Pulse',
        genre: 'Synthwave / Arpeggios',
        duration: '3:20',
        durationSec: 200,
        bitrate: '320 kbps • 48 kHz',
        type: 'synth'
      },
      {
        id: 'kyoto-rain',
        title: 'Kyoto Rain & Warm Piano',
        artist: 'Sumit • Binaural Nature',
        genre: 'Rainstorm / Felt Piano',
        duration: '5:00',
        durationSec: 300,
        bitrate: '320 kbps • 48 kHz',
        type: 'synth'
      },
      {
        id: 'chill-sunset',
        title: 'Chillwave Sunset',
        artist: 'Sumit • Dream Pop',
        genre: 'Warm Chords / Sub-Bass',
        duration: '3:38',
        durationSec: 218,
        bitrate: '320 kbps • 48 kHz',
        type: 'synth'
      },
      {
        id: 'space-drone',
        title: 'Deep Space 432Hz Drone',
        artist: 'Sumit • Meditation',
        genre: 'Singing Bowl / 432Hz',
        duration: '6:30',
        durationSec: 390,
        bitrate: 'Flac 24-bit • Harmonic',
        type: 'synth'
      },
      {
        id: 'jazz-lounge',
        title: 'Midnight Coffeehouse Jazz',
        artist: 'Sumit • Blue Notes',
        genre: 'Walking Bass / Keys',
        duration: '4:05',
        durationSec: 245,
        bitrate: '320 kbps • 48 kHz',
        type: 'synth'
      },
      {
        id: 'live-lofi-stream',
        title: 'Lofi Girl Live Radio Stream',
        artist: 'Live Internet Stream',
        genre: 'Continuous 24/7 Beats',
        duration: 'LIVE',
        durationSec: 99999,
        streamUrl: 'https://stream.zeno.fm/f3wvbbqmdg8uv',
        bitrate: '192 kbps MP3 Stream',
        type: 'stream'
      }
    ];
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 128;
    this.analyser.smoothingTimeConstant = 0.82;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  onStateChange(cb) {
    this.listeners.push(cb);
  }

  notify() {
    this.listeners.forEach(cb => cb({
      isPlaying: this.isPlaying,
      currentTrack: this.tracks[this.currentTrackIndex],
      trackIndex: this.currentTrackIndex,
      volume: this.volume,
      currentTime: this.currentTime,
      duration: this.tracks[this.currentTrackIndex].durationSec,
      isShuffle: this.isShuffle,
      isRepeat: this.isRepeat
    }));
  }

  async toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      await this.play(this.currentTrackIndex);
    }
  }

  async play(trackIndex = this.currentTrackIndex) {
    this.init();
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.stopCurrent();
    this.currentTrackIndex = trackIndex;
    this.currentTime = 0;
    this.isPlaying = true;

    const track = this.tracks[trackIndex];

    if (track.type === 'stream' && track.streamUrl) {
      this.playStream(track.streamUrl);
    } else {
      switch (track.id) {
        case 'lofi-study':
          this.playLofiStudy();
          break;
        case 'aero-nostalgia':
          this.playAeroNostalgia();
          break;
        case 'cyber-focus':
          this.playCyberSynth();
          break;
        case 'kyoto-rain':
          this.playKyotoRain();
          break;
        case 'chill-sunset':
          this.playChillSunset();
          break;
        case 'space-drone':
          this.playDeepSpace();
          break;
        case 'jazz-lounge':
          this.playJazzLounge();
          break;
        default:
          this.playLofiStudy();
      }
    }

    // Progress timer
    this.timerId = setInterval(() => {
      if (this.isPlaying) {
        this.currentTime++;
        if (track.type !== 'stream' && this.currentTime >= track.durationSec) {
          if (this.isRepeat) {
            this.play(this.currentTrackIndex);
          } else {
            this.next();
          }
        } else {
          this.notify();
        }
      }
    }, 1000);

    this.notify();
  }

  pause() {
    this.stopCurrent();
    this.isPlaying = false;
    this.notify();
  }

  next() {
    if (this.isShuffle) {
      const nextIdx = Math.floor(Math.random() * this.tracks.length);
      this.play(nextIdx);
    } else {
      const nextIdx = (this.currentTrackIndex + 1) % this.tracks.length;
      this.play(nextIdx);
    }
  }

  prev() {
    const prevIdx = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.play(prevIdx);
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    this.notify();
    return this.isShuffle;
  }

  toggleRepeat() {
    this.isRepeat = !this.isRepeat;
    this.notify();
    return this.isRepeat;
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    this.notify();
  }

  getFrequencyData() {
    if (!this.analyser) return new Uint8Array(64).fill(0);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  stopCurrent() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
      this.audioElement = null;
    }
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
  }

  playStream(url) {
    try {
      this.audioElement = new Audio();
      this.audioElement.crossOrigin = 'anonymous';
      this.audioElement.src = url;
      this.audioElement.volume = this.volume;

      if (!this.audioSourceNode) {
        this.audioSourceNode = this.ctx.createMediaElementSource(this.audioElement);
        this.audioSourceNode.connect(this.masterGain);
      }

      this.audioElement.play().catch(e => {
        console.warn('Audio stream autoplay policy caught, falling back to synth', e);
        this.playLofiStudy();
      });
    } catch (e) {
      this.playLofiStudy();
    }
  }

  // --- Track 1: Late Night Study (Lofi Rhodes + Sub Bass + Vinyl Crackle) ---
  playLofiStudy() {
    const chords = [
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];
    const bass = [73.42, 65.41, 55.00, 49.00];
    let step = 0;

    const playBeat = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;
      const chord = chords[step % chords.length];
      const bassNote = bass[step % bass.length];
      step++;

      // Rhodes chord
      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700 + i * 80, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08 / (i + 1), now + 0.12 + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 3.6);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + i * 0.025);
        osc.stop(now + 3.8);
      });

      // Warm Sub Bass
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(bassNote, now);
      bassGain.gain.setValueAtTime(0.12, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);
      bassOsc.connect(bassGain);
      bassGain.connect(this.masterGain);
      bassOsc.start(now);
      bassOsc.stop(now + 3.4);
    };

    playBeat();
    this.intervalId = setInterval(playBeat, 3600);
    this.addVinylCrackle();
  }

  // --- Track 2: Windows 7 Aero Nostalgia (Dreamy 2009 Ambient Reverb & Shimmer) ---
  playAeroNostalgia() {
    const shimmerPitches = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    const padPitches = [130.81, 164.81, 196.00, 246.94];

    // Sustained Ambient Glass Pad
    padPitches.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      gain.gain.setValueAtTime(0.04 / (idx + 1), this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      lfo.start();
      this.activeNodes.push(osc, gain, lfo, lfoGain);
    });

    // Random Windows 7 Shimmer Chimes
    const playChime = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;
      const freq = shimmerPitches[Math.floor(Math.random() * shimmerPitches.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.6);
    };

    playChime();
    this.intervalId = setInterval(playChime, 2200);
  }

  // --- Track 3: Cyberpunk 1984 Focus (Retro Synth Arpeggios) ---
  playCyberSynth() {
    const notes = [130.81, 164.81, 196.00, 246.94, 261.63, 329.63, 392.00, 493.88];
    let step = 0;

    const playArp = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;
      const freq = notes[step % notes.length];
      step++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + (step % 8) * 120, now);
      filter.Q.setValueAtTime(3.5, now);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.3);
    };

    playArp();
    this.intervalId = setInterval(playArp, 280);
  }

  // --- Track 4: Kyoto Rain & Warm Piano ---
  playKyotoRain() {
    // Pink noise rain
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
      b6 = white * 0.115926;
    }

    const rainSource = this.ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.32, this.ctx.currentTime);

    rainSource.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain);

    rainSource.start();
    this.activeNodes.push(rainSource, filter, rainGain);

    // Piano chords
    const pianoChords = [
      [349.23, 440.00, 523.25], // F
      [392.00, 493.88, 587.33], // G
      [440.00, 523.25, 659.25], // Am
      [329.63, 392.00, 493.88]  // Em
    ];
    let pIdx = 0;

    const playPiano = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;
      const chord = pianoChords[pIdx % pianoChords.length];
      pIdx++;

      chord.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + 4.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 4.5);
      });
    };

    playPiano();
    this.intervalId = setInterval(playPiano, 4500);
  }

  // --- Track 5: Chillwave Sunset (Warm Chorus Guitar Chords & Sub Bass) ---
  playChillSunset() {
    const chords = [
      [220.00, 277.18, 329.63, 440.00], // A
      [174.61, 220.00, 261.63, 349.23], // F
      [196.00, 246.94, 293.66, 392.00]  // G
    ];
    let step = 0;

    const playWave = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;
      const chord = chords[step % chords.length];
      step++;

      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.07, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 4.8);
      });
    };

    playWave();
    this.intervalId = setInterval(playWave, 4600);
  }

  // --- Track 6: Deep Space 432Hz Drone ---
  playDeepSpace() {
    const freqs = [108, 216, 432, 864];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      lfo.frequency.setValueAtTime(0.05 + idx * 0.02, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      gain.gain.setValueAtTime(0.05 / (idx + 1), this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      lfo.start();
      this.activeNodes.push(osc, gain, lfo, lfoGain);
    });
  }

  // --- Track 7: Midnight Coffeehouse Jazz ---
  playJazzLounge() {
    const chords = [
      [261.63, 311.13, 392.00, 466.16], // Cm7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [349.23, 440.00, 523.25, 622.25]  // F7
    ];
    let step = 0;

    const playJazzStep = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;
      const chord = chords[step % chords.length];
      step++;

      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.06 / (i + 1), now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 3.2);
      });
    };

    playJazzStep();
    this.intervalId = setInterval(playJazzStep, 3200);
    this.addVinylCrackle();
  }

  addVinylCrackle() {
    const bufferSize = this.ctx.sampleRate * 2;
    const crackleBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = crackleBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() > 0.997 ? (Math.random() * 2 - 1) * 0.12 : 0;
    }
    const crackle = this.ctx.createBufferSource();
    crackle.buffer = crackleBuffer;
    crackle.loop = true;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    crackle.connect(gain);
    gain.connect(this.masterGain);
    crackle.start();
    this.activeNodes.push(crackle, gain);
  }
}

window.ambientPlayer = new AmbientPlayer();
