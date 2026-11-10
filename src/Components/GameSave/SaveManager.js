import Player from "../GamePlayer/Player";
import SaveFile from "./SaveFile";
import * as types from "./types";
import { sortSaveFiles } from "./utils";

class SaveManager {
  /** @type {types.SaveFiles} saveFiles */
  /**
   * @param {types.SaveFiles|undefined} saveFiles
   */
  constructor(saveFiles) {
    if (saveFiles && typeof saveFiles != "object") {
      throw new Error(
        "Invalid save file. Expected object but found " + typeof saveFiles,
      );
    }
    this.saveFiles = saveFiles ?? [];
  }

  /**
   * @returns {types.SaveFiles}
   */
  getSaveFiles() {
    return this.saveFiles;
  }

  /**
   * Save
   *
   * @param {SaveFile} saveFile
   */
  save(saveFile, overwrite = false) {
    // check for previous save
    let index = this.findSaveDataIndexForPlayer(saveFile.player);
    console.log("index", index);
    if (index > -1) {
      if (!overwrite) {
        throw new Error(`Player '${saveFile.player.getName()}' already exists`);
      }
    } else {
      index = this.saveFiles.length;
    }
    saveFile.updateTimestamp();
    this.saveFiles[index] = saveFile;
    this.sort();
  }

  /**
   * @param {SaveFile} saveFile
   */
  removeSaveFile(saveFile) {
    let index = this.findSaveDataIndexForPlayer(saveFile.player);
    if (index > -1) {
      this.saveFiles.splice(index, 1);
    }
  }

  /**
   * @param {Player} player
   * @returns {SaveFile|null}
   */
  findSaveDataForPlayer(player) {
    return this.saveFiles.find(
      (file) => file.player.getName() == player.getName(),
    );
  }

  /**
   * @param {Player} player
   * @returns {number}
   */
  findSaveDataIndexForPlayer(player) {
    return this.saveFiles.findIndex(
      (file) => file.player.getName() == player.getName(),
    );
  }

  sort() {
    this.saveFiles = this.saveFiles.sort(sortSaveFiles);
  }

  /**
   * Factory function for SaveManager from plain object
   * (parse local storage / db data into model)
   *
   * @param {Object} saveFiles
   * @returns
   */
  static fromObject(saveFiles) {
    // parse save files into SaveFile

    const data = [];
    if (saveFiles && Array.isArray(saveFiles)) {
      saveFiles.forEach((saveFile) => {
        if (!(saveFile instanceof SaveFile)) {
          const { player, lastSaveTimestamp } = saveFile || {};
          data.push(new SaveFile(Player.fromObject(player), lastSaveTimestamp));
        }
      });
    }
    return new SaveManager(data);
  }
}

export default SaveManager;
