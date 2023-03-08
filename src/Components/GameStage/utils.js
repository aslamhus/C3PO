/**
 * getBoundsRelativeToParent
 *
 * @param {DOMRect} elBounds
 * @returns {Object} - the element bounds with game stage as a cartesian reference point.
 * Also returns the percentValues of each property.
 */
export const getBoundsRelativeToParent = (el, parent) => {
  const elBounds = el.getBoundingClientRect();
  const parentBounds = parent.getBoundingClientRect();
  const x = elBounds.x - parentBounds.x;
  const y = elBounds.y - parentBounds.y;
  const height = elBounds.height;
  const width = elBounds.width;
  const top = elBounds.top - parentBounds.top;
  const left = elBounds.left - parentBounds.left;
  const right = parentBounds.right - elBounds.right;
  const bottom = parentBounds.bottom - elBounds.bottom;
  return {
    x,
    xPercent: x / parentBounds.width,
    y,
    yPercent: y / parentBounds.height,
    height,
    heightPercent: height / parentBounds.height,
    width,
    widthPercent: width / parentBounds.width,
    top,
    topPercent: top / parentBounds.height,
    left,
    leftPercent: left / parentBounds.width,
    right,
    rightPercent: right / parentBounds.width,
    bottom,
    bottomPercent: bottom / parentBounds.height,
  };
};
