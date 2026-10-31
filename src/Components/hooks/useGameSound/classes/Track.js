class Track {
  constructor(src, ctx, gain = 1) {
    this.src = src;
    this.ctx = ctx;
    this.loaded = false;
    this.gain = gain;
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.value = gain;
  }

  setGain(value) {
    this.gainNode.gain.value = value;
  }
}

export default Track;
