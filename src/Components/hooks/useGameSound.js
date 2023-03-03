import jawaTheme from '@sounds/the-little-people-work.mp3';
import starWarsThemeSong from '@sounds/star-wars-main-theme.mp3';
import select from '@sounds/fx/select.mp3';
import confirm from '@sounds/fx/confirm.mp3';
import click from '@sounds/fx/click.mp3';
import working from '@sounds/fx/working.mp3';
import working2 from '@sounds/fx/working2.mp3';
import error from '@sounds/fx/error.mp3';
import success from '@sounds/fx/success.mp3';
import binaryDecoder from '@sounds/fx/binary-decoder.mp3';

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
};
export const useGameSound = () => {
  const playSound = (title) => {
    return new Promise((resolve, reject) => {
      let audio;
      try {
        audio = new Audio(title);
      } catch (error) {
        reject(error);
      }
      audio.play();
      audio.addEventListener('pause', (event) => {
        resolve(true);
      });
      return audio.play();
    });
  };

  return { playSound, music, fx };
};
