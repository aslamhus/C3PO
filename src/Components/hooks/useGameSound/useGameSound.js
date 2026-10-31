// music
import jawaTheme from "@sounds/the-little-people-work.mp3";
import starWarsThemeSong from "@sounds/star-wars-main-theme.mp3";
import binarySunet from "@sounds/binary-sunset.mp3";
// fx
import select from "@sounds/fx/select.mp3";
import confirm from "@sounds/fx/confirm.mp3";
import click from "@sounds/fx/click.mp3";
import working from "@sounds/fx/working.mp3";
import working2 from "@sounds/fx/working2.mp3";
import error from "@sounds/fx/error.mp3";
import success from "@sounds/fx/success.mp3";
import binaryDecoder from "@sounds/fx/binary-decoder.mp3";

export const fx = {
  select,
  confirm,
  click,
  working,
  working2,
  error,
  success,
  binaryDecoder,
};

export const music = {
  jawaTheme,
  starWarsThemeSong,
  binarySunet,
};

export const TRACK_TYPES = {
  MUSIC: "music",
  FX: "fx",
};
import GameSoundContext from "./context";
import { useContext } from "react";
import MusicTrack from "./classes/MusicTrack";
import SoundFXTrack from "./classes/SoundFXTrack";
import { actions } from "./Reducer";

export const useGameSound = () => {
  const [state, dispatch, audioContextRef, trackManagerRef] =
    useContext(GameSoundContext);

  const { musicGain, fxGain } = state;

  const cueTrack = async (src, type) => {
    // find or create new music track
    let track = trackManagerRef.current.findTrack(src, type);
    if (!track) {
      switch (type) {
        case TRACK_TYPES.FX:
          track = new SoundFXTrack(src, audioContextRef.current, fxGain);
          break;
        case TRACK_TYPES.MUSIC:
          track = new MusicTrack(src, audioContextRef.current, musicGain);
          break;
      }
      trackManagerRef.current.addTrack(track);
      await track.load();
    }
    return track;
  };

  const cueMusic = async (src, options = { loop: false }) => {
    // pause any other music tracks
    trackManagerRef.current.pauseBackgroundMusic();
    let track = await cueTrack(src, TRACK_TYPES.MUSIC);
    track.seek(0);
    track.play();
  };

  const cueSoundFx = async (src) => {
    if (!src) {
      throw new Error(`Invalid sound fx src :'${src}'`);
    }
    let track = await cueTrack(src, TRACK_TYPES.FX);
    track.play();
  };

  const resume = () => {
    // check if context is suspended
    const ctx = audioContextRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }
  };

  const setMusicGain = (value) => {
    trackManagerRef.current.setMusicGain(value);
    dispatch({ type: actions.setMusicGain, payload: value });
  };

  const setFXGain = (value) => {
    trackManagerRef.current.setFXGain(value);
    dispatch({ type: actions.setFXGain, payload: value });
  };

  return {
    cueSoundFx,
    cueMusic,
    setMusicGain,
    setFXGain,
    musicGain,
    fxGain,
    music,
    fx,
  };
};
