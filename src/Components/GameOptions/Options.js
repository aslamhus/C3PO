class Options {
  constructor(options) {
    this.musicGain = options?.musicGain ?? 1;
    this.fxGain = options?.fxGain ?? 1;
  }

  setMusicGain(gain) {
    this.musicGain = gain;
  }

  setFXGain(gain) {
    this.fxGain = gain;
  }
  getMusicGain() {
    return this.musicGain;
  }

  getFxGain() {
    return this.fxGain;
  }
}

export default Options;
