import { characterToBinaryDict } from '@components/ControlKeypad/binaryDict';

export const getOppositeCase = (char) => {
  const { lowercase, uppercase } = characterToBinaryDict;
  const char_lc = char.toLowerCase(),
    char_uc = char.toUpperCase();
  if (lowercase[char_lc]) {
    return {
      char: char_uc,
      binary: uppercase[char_uc],
      caseType: 'uppercase',
    };
  }
  if (uppercase[char_uc]) {
    return {
      char: char_lc,
      binary: lowercase[char_lc],
      caseType: 'lowercase',
    };
  }
  return false;
};

/**
 * Find char in message
 *
 * @param {string} char
 * @param {string} source
 * @returns {number}
 */
export const hasChar = (char, source) => {
  return source.indexOf(char) > -1;
};
