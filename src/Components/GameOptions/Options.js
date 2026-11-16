class Options {
  constructor(options) {
    this.musicGain = options?.musicGain ?? 1;
    this.fxGain = options?.fxGain ?? 1;
    this.isMuted = options?.isMuted ?? false;
  }

  setMusicGain(gain) {
    this.musicGain = gain;
  }

  setFXGain(gain) {
    this.fxGain = gain;
  }

  setIsMuted(value) {
    this.isMuted = value;
  }
  getMusicGain() {
    return this.musicGain;
  }

  getFxGain() {
    return this.fxGain;
  }

  getIsMuted() {
    return this.isMuted;
  }
}

export default Options;
