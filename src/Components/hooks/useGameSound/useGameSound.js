// music
import jawaTheme from "@sounds/the-little-people-work.mp3";
import starWarsThemeSong from "@sounds/star-wars-main-theme.mp3";
import binarySunet from "@sounds/binary-sunset.mp3";

import tatooineEbonHawk from "@sounds/tatooine-ebon-hawk.mp3";
import tatooineDuneSea from "@sounds/tatooine-dune-sea.mp3";

// fx
import select from "@sounds/fx/select.mp3";
import confirm from "@sounds/fx/confirm.mp3";
import click from "@sounds/fx/click.mp3";
import working from "@sounds/fx/working.mp3";
import working2 from "@sounds/fx/working2.mp3";
import error from "@sounds/fx/error.mp3";
import success from "@sounds/fx/success.mp3";
import binaryDecoder from "@sounds/fx/binary-decoder.mp3";
import powerDown from "@sounds/fx/power-down.mp3";

import powerUp from "@sounds/fx/power-up.mp3";
import heal from "@sounds/fx/heal.mp3";

export const fx = {
  select,
  confirm,
  click,
  working,
  working2,
  error,
  success,
  binaryDecoder,
  heal,
  powerDown,
};

export const music = {
  jawaTheme,
  starWarsThemeSong,
  binarySunet,
  tatooineEbonHawk,
  tatooineDuneSea,
};

const trackGainModulatio = {
  [fx.binaryDecoder]: 0.4,
  [music.jawaTheme]: 1.2,
};

export const TRACK_TYPES = {
  MUSIC: "music",
  FX: "fx",
};
import GameSoundContext from "./context";
import { useContext } from "react";
import MusicTrack from "./classes/MusicTrack";
import SoundFXTrack from "./classes/SoundFXTrack";
import { GAME_SOUND_ACTIONS } from "./Reducer";
import useSave from "../../GameSave/hooks/useSave";
import useGamePlayer from "../../GamePlayer/hooks/useGamePlayer";

export const useGameSound = () => {
  const [state, dispatch, audioContextRef, trackManagerRef] =
    useContext(GameSoundContext);

  const { musicGain, fxGain } = state;

  const { player } = useGamePlayer();

  const cueTrack = async (src, type) => {
    const modulation = trackGainModulatio[src] ?? 1;
    // find or create new music track
    let track = trackManagerRef.current.findTrack(src, type);
    if (!track) {
      switch (type) {
        case TRACK_TYPES.FX:
          track = new SoundFXTrack(
            src,
            audioContextRef.current,
            fxGain * modulation,
          );
          break;
        case TRACK_TYPES.MUSIC:
          track = new MusicTrack(
            src,
            audioContextRef.current,
            musicGain * modulation,
          );
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
      return ctx.resume();
    }
  };

  const pause = () => {
    const ctx = audioContextRef.current;
    if (ctx.state === "running") {
      return ctx.suspend();
    }
  };

  const pauseMusic = () => {
    const musicTracks = trackManagerRef.current.pauseBackgroundMusic();
  };

  const setMusicGain = (value) => {
    trackManagerRef.current.setMusicGain(value);
    player.options.setMusicGain(value);
    // Note: we save when closing options menu
    dispatch({ type: GAME_SOUND_ACTIONS.setMusicGain, payload: value });
  };

  const setFXGain = (value) => {
    trackManagerRef.current.setFXGain(value);
    player.options.setFXGain(value);
    // Note: we save when closing options menu
    dispatch({ type: GAME_SOUND_ACTIONS.setFXGain, payload: value });
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
    resume,
    pause,
    trackManagerRef,
    pauseMusic,
  };
};
