/**
 * Sorting save data by timestamp
 *
 * @param {SaveFile} a
 * @param {SaveFile} b
 */
export const sortSaveFiles = (a, b) => {
  if (a.lastSaveTimestamp > b.lastSaveTimestamp) {
    return -1;
  } else if (a.lastSaveTimestamp < b.lastSaveTimestamp) {
    return 1;
  }
  return 0;
};
