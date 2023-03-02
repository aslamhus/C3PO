import gsap from 'gsap';

export const getTimeline = (byteRef, colors, options = { delay: 0.1, duration: 0.3 }) => {
  const { delay, duration } = options;
  const tl = gsap.timeline({ delay, paused: true });
  // reverse array without repeating last color.
  colors.push(...[...colors].reverse().slice(1));
  colors.forEach((color) => tl.to(byteRef.current, { backgroundColor: color, duration }));
  tl.to(byteRef.current, { backgroundColor: 'transparent', duration: 0 });
  //   tl.pause();
  return tl;
};

export const animateDecode = (byteRef, options = {}) => {
  options.color = options.color || 'yellow';
  options.delay = options.delay || 0;
  options.duration = options.duration || 1;
  options.fadeOutDuration = options.fadeOutDuration || 0.3;
  options.fadeOutDelay = options.fadeOutDelay || 5;
  const { color, delay, duration, fadeOutDuration, fadeOutDelay } = options;

  gsap.to(byteRef.current, { backgroundColor: color, duration, delay });
  gsap.to(byteRef.current, {
    backgroundColor: 'transparent',
    delay: fadeOutDelay,
    duration: fadeOutDuration,
  });
};

const flattenBinaryDict = (dict) => {
  Object.keys(dict).reduce((acc, value) => {
    if (dict[value] instanceof Object) {
      Object.entries(dict[value]).forEach((entry) => {
        const [letter, binary] = entry;
        acc[binary] = letter;
      });
    }
    return acc;
  }, {});
};
