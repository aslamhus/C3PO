import Track from "./Track";

class SoundFXTrack extends Track {
  constructor(src, ctx, gain) {
    super(src, ctx, gain);
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
   * @param {AudioBuffer} audioBuffer
   * @param {AudioContext} ctx
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
    source.connect(this.gainNode).connect(this.ctx.destination);
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
