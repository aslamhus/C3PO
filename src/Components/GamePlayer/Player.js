import Options from "../GameOptions/Options";
import Score from "./Score";

class Player {
  /** @type {string}  */
  name;

  /** @type {Options}  */
  options;

  /** @type {Score}  */
  score;

  /**
   * @param {string} name
   * @param {Options} options
   * @param {Score} score
   */
  constructor(name, options, score) {
    this.name = name.toUpperCase();
    this.options = options ?? new Options();
    this.score = score ?? new Score();
  }

  getName() {
    return this.name;
  }

  getScore() {
    return this.score;
  }

  getOptions() {
    return this.options;
  }

  getLevel() {
    return parseFloat(this.score.level ?? 1.0);
  }

  /**
   * @param {string} name
   */
  setName(name) {
    this.name = name.toUpperCase();
  }

  /**
   * @param {Object} player
   * @returns {Player}
   */
  static fromObject(player) {
    const { name, options, score } = player || {};
    return new Player(name, new Options(options), new Score(score));
  }
}

export default Player;
