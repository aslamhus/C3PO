import SaveManager from "./SaveManager";
import SaveFile from "./SaveFile";
import Player from "../GamePlayer/Player";

/**
 * @typedef {Array<SaveFile>} SaveFiles
 *
 * @typedef {Object} UseSaveReturn
 * @property {function(Player, boolean) : void} savePlayer
 * @property {function(Player) : void} createPlayer
 * @property {function(string) : SaveFile|null} findSaveFileForPlayerWithName
 * @property {SaveFiles} saveFiles
 *
 * @typedef {Object} saveManagerRef
 * @property {SaveManager} current
 */

export {};
