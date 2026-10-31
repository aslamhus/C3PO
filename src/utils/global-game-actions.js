import { speed } from '../config';

export const wait = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration * 1000 * speed);
  });
};
