import { TRACK_TYPES } from "../useGameSound";
import MusicTrack from "./MusicTrack";
import SoundFxTrack from "./SoundFXTrack";

class TrackManager {
  /** @type {AudioContext} */
  ctx;

  /** @type {GainNode} */
  masterGainNode;

  constructor(ctx, options = { isMuted: false }) {
    this.ctx = ctx;
    this.masterGainNode = this.createMasterGainNode();
    this.isMuted = options?.isMuted ?? false;
    if (this.isMuted) {
      this.setIsMuted(true);
    }
    this.tracks = {
      music: {},
      fx: {},
    };
  }

  getMasterGainNode() {
    return this.masterGainNode;
  }

  createMasterGainNode() {
    const masterGain = this.ctx.createGain();
    masterGain.connect(this.ctx.destination);

    return masterGain;
  }

  setIsMuted(value) {
    this.isMuted = value;
    this.masterGainNode.gain.value = this.isMuted ? 0 : 1;
  }

  setMusicGain(value) {
    Object.values(this.tracks[TRACK_TYPES.MUSIC]).forEach((track) => {
      track.setGain(value);
    });
  }

  setFXGain(value) {
    Object.values(this.tracks[TRACK_TYPES.FX]).forEach((track) => {
      track.setGain(value);
    });
  }

  setIsMuted(value) {
    this.isMuted = value;
    this.masterGainNode.gain.value = this.isMuted ? 0 : 1;
  }

  toggleMute() {
    this.setIsMuted(!this.isMuted);
  }
  /**
   * Find track src (if it exists)
   * Will return an HTMLAudioElement for music or
   * AudioBuffer for sound fx
   *
   * @param {*} src
   * @param {*} type - music | fx
   * @returns {HTMLAudioElement|AudioBuffer|null}
   */
  findTrack(src, type) {
    if (!this.tracks[type]) {
      throw new Error("Invalid audio track type. Expected music|fx");
    }
    const audio = this.tracks[type]?.[src];
    if (audio) {
      return audio;
    }
  }

  addTrack(track) {
    let type;
    if (track instanceof MusicTrack) {
      type = TRACK_TYPES.MUSIC;
    } else if (track instanceof SoundFxTrack) {
      type = TRACK_TYPES.FX;
    } else {
      throw new Error("Invalid track type: " + track?.constructor?.name);
    }
    this.tracks[type][track.src] = track;
  }

  pauseBackgroundMusic() {
    Object.values(this.tracks[TRACK_TYPES.MUSIC]).forEach((track) => {
      track.pause();
    });
  }
}

export default TrackManager;
