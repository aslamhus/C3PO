import Track from "./Track";

class SoundFXTrack extends Track {
  /**
   * @param {*} src - the audio src
   * @param {*} ctx - the audio context
   * @param {*} gain - the gain value
   * @param {*} nodeDestination - the node connection destination (i.e. audioContext.destination or another node, like master gain)
   */
  constructor(src, ctx, gain, nodeDestination) {
    super(src, ctx, gain, nodeDestination);
    this.audioBuffer = null;
  }

  /**
   * Create Audio Buffer Node
   * for shorter clips like sound fx
   * Audio buffers reside in memory and are reusable
   * Note that these sound fx should be preloaded
   * @param {HTMLAudioElement} audioElement
   * @param {AudioContext} ctx
   */
  async createAudioBufferNode() {
    const res = await fetch(this.src);
    const arrayBuffer = await res.arrayBuffer();
    return await this.ctx.decodeAudioData(arrayBuffer);
  }

  /**
   *Create audio buffer source node from audio buffer
   * @returns {AudioBufferSourceNode}
   */
  createAudioBufferSourceNode() {
    if (!this.audioBuffer) {
      throw new Error(
        `Could not play sound fx ${this.src}: Empty audio buffer`,
      );
    }
    const source = this.ctx.createBufferSource();
    source.buffer = this.audioBuffer;
    source.connect(this.gainNode).connect(this.destination);
    return source;
  }

  async load() {
    this.audioBuffer = await this.createAudioBufferNode();
    this.loaded = true;
  }

  async play() {
    if (!this.loaded) {
      throw new Error(
        "Cannot play sound track, audio buffer must be loaded first",
      );
    }
    const source = this.createAudioBufferSourceNode();
    return source.start();
  }
}

export default SoundFXTrack;
