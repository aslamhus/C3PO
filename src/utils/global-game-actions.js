import { speed } from "../config";

export const wait = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration * 1000);
  });
};

/**
 * Create Skippable action
 *
 * @param {Object} options - abort controller options
 * @returns
 */
export const createSkippable = (options = { once: true }) => {
  const abortController = new AbortController(options);
  const { signal } = abortController;
  // wrap the event listener in a promise so we can get it
  // into scope of the skip method and race it against the action
  const aborted = new Promise((_, reject) => {
    signal.addEventListener("abort", () => reject(signal.reason), {
      once: true,
    });
  });
  aborted.catch(() => {}); // no unhandled-rejection warning if never awaited

  const skip = async (action) => {
    signal.throwIfAborted();
    const res = await Promise.race([action, aborted]);
    signal.throwIfAborted();
    return res;
  };

  skip.skip = () => abortController.abort();
  skip.signal = signal;
  return skip;
};

// export const skipRunner = async (func, { signal }) => {
//   return new Promise((resolve, reject) => {
//     signal.throwIfAborted();
//     const handleSkip = (error) => reject(error);
//     /**
//      * @param {AbortSignalEventMap} event
//      */
//     signal.addEventListener("abort", (event) => {
//       console.log("abort event", event);
//       const err = new Error(signal.reason);
//       err.name = "AbortError";
//       handleSkip(err);
//     });
//     func()
//       .then(() => resolve(true))
//       .catch((error) => {
//         if (error.name !== "AbortError") {
//           reject(error);
//         }
//         return handleSkip(error);
//       });
//   });
// };

/**
 *
 * @param {Function} func
 * @param {AbortController} - skip controller
 */
export const skippable = async (func, { signal }, name) => {
  if (!signal || !(signal instanceof AbortSignal)) {
    throw new Error(
      "Skippable requires Abort Controller and signal but found: " +
        typeof signal,
    );
  }
  signal.throwIfAborted();
  let res = await Promise.resolve(func);
  signal.throwIfAborted();
  return res;
};

const outer = async () => {
  await inner1();
  await inner2();
};

const inner1 = async () => {
  await innerInner1();
  await innerInner2();
};

const inner2 = async () => {
  await anotherInner1();
  await anotherInner2();
};
