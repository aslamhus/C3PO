export const levels = {
  danger: 'danger',
  low: 'low',
  mid: 'mid',
  high: 'high',
  full: 'full',
};

/**
 * Get energy level
 *
 * @param {Number} energy - number between 0 and 1
 * @returns
 */
export const getEnergyLevel = (energy) => {
  switch (true) {
    case energy >= 1:
      return levels.full;
    case energy > 0.75:
      return levels.high;
    case energy > 0.5 && energy <= 0.75:
      return levels.mid;
    case energy > 0.3 && energy <= 0.5:
      return levels.low;
    case energy <= 0.3:
      return levels.danger;
  }
};
