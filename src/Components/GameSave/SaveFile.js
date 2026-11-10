import Player from "../GamePlayer/Player";

class SaveFile {
  /**
   * @param {Player} player
   * @param {number} lastSaveTimestamp
   */
  constructor(player, timestamp) {
    this.player = player;
    this.lastSaveTimestamp = timestamp ?? Date.now();
  }

  updateTimestamp() {
    this.lastSaveTimestamp = Date.now();
  }
}

export default SaveFile;
