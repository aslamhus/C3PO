/**
 * Focus List Manager
 *
 * Keeps a list of ReactRefs to cycle between
 * It cannot accept HTMLElements, as their reference may disappear on re-renders
 *
 * @typedef {Array<React.RefObject>} FocusList
 */
class FocusListManager {
  /** @type {FocusList} */
  list;

  constructor(list) {
    this.list = list ?? [];
  }

  /**
   *
   * @param {FocusList} list
   */
  setList(list) {
    if (list instanceof NodeList) {
      this.list = Array.from(list);
      return;
    }
    if (list.length && !list.every((item) => item instanceof React.RefObject)) {
      throw new Error(
        "Invalid focus list, expected array with every item React.RefObject",
      );
    }
    this.list = list;
  }

  /**
   *
   * @returns {FocusList}
   */
  getList() {
    return this.list;
  }

  clearList() {
    this.list = [];
  }

  /**
   * @returns {number}
   */
  findActiveFocusIndex() {
    return this.list.findIndex((el) => document.activeElement == el);
  }

  /**
   * @returns {React.RefObject|null}
   */
  getPrev() {
    const activeIndex = this.findActiveFocusIndex();
    let next = null;
    if (activeIndex == -1) {
      next = this.list[0];
    } else if (activeIndex == 0) {
      next = this.list[this.list.length - 1];
    } else {
      next = this.list[activeIndex - 1];
    }
    return next;
  }

  /**
   * @returns {React.RefObject|null}
   */
  getNext() {
    const activeIndex = this.findActiveFocusIndex();
    let prev = null;
    if (activeIndex == -1) {
      prev = this.list[0];
    } else if (activeIndex == this.list.length - 1) {
      prev = this.list[0];
    } else {
      prev = this.list[activeIndex + 1];
    }
    return prev;
  }

  push(item) {
    if (!(item instanceof React.RefObject)) {
      throw new Error(
        "Failed to push item to Focus List, expected React.RefObject but found " +
          typeof item,
      );
    }
    this.list.push(item);
  }
}

export default FocusListManager;
