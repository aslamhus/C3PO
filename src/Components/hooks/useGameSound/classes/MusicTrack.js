import Track from "./Track";
import { TRACK_TYPES } from "../useGameSound";

class MusicTrack extends Track {
  /**
   * @param {*} src - the audio src
   * @param {*} ctx - the audio context
   * @param {*} gain - the gain value
   * @param {*} destination - the node connection destination (i.e. audioContext.destination or another node, like master gain)
   */
  constructor(src, ctx, gain, destination) {
    super(src, ctx, gain, destination);
    this.audioElement = new Audio(src);
  }

  /**
   * Create Media Element Source
   * For longer sounds like bg music
   * @param {HTMLAudioElement} audioElement
   * @param {AudioContext} ctx
   */
  createMediaElementSource() {
    // create audio source node
    const track = this.ctx.createMediaElementSource(this.audioElement);

    // connect it to default audio context destination
    track.connect(this.gainNode).connect(this.destination);
  }

  load() {
    // create media element source node and connect to audio context
    this.createMediaElementSource();
    return this.audioElement.load();
  }

  seek(time) {
    if (this.audioElement.seekable) {
      this.audioElement.currentTime = time;
    }
  }

  play() {
    // resume music if suspended
    this.audioElement.play().catch((err) => {
      console.error("cueMusicError", err);
    });
  }

  pause() {
    this.audioElement.pause();
  }
}

export default MusicTrack;
