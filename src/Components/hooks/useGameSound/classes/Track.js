class Track {
  /**
   * @param {*} src - the audio src
   * @param {*} ctx - the audio context
   * @param {*} gain - the gain value
   * @param {*} destination - the node connection destination (i.e. audioContext.destination or another node, like master gain)
   */
  constructor(src, ctx, gain = 1, destination) {
    if (!destination || !(destination instanceof AudioNode)) {
      throw new Error(
        "Invalid destination for track " +
          src +
          ". Expected audio node but found " +
          typeof destination,
      );
    }
    this.src = src;
    this.ctx = ctx;
    this.loaded = false;
    this.gain = gain;
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.value = gain;
    this.destination = destination;
  }

  setGain(value) {
    this.gainNode.gain.value = value;
  }
}

export default Track;
