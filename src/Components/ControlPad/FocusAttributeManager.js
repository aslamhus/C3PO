/**
 * Focus Attribute Manager
 *
 * Finds the next / previous child element with given data attriubte
 *
 * @typedef {Array<React.RefObject>} FocusList
 */
class FocusAttributeManager {
  constructor(parentRef, context) {
    if (!context) {
      throw new Error(
        "Focus attribute manager requires unique context but found " + context,
      );
    }
    this.attributeName = "focus";
    this.context = context;
    this.parentRef = parentRef;
    this.activeEl = null;
  }

  //   /**
  //    *
  //    * @param {React.RefObject} parentRef
  //    */
  //   setParentRef(parentRef) {
  //     this.parentRef = parentRef;
  //     console.log("set parent ref");
  //   }

  getContext() {
    return this.context;
  }
  getCurrentFocusIndex() {
    return this.activeEl ? this.activeEl.dataset[this.attributeName] : 0;
  }

  /**
   * @returns {HTMLCollection|null}
   */
  findFocusableElements() {
    if (!this.parentRef?.current) {
      throw new Error(
        "Failed to find focusable element, parent ref is not set",
      );
    }
    const nodeCollection = this.parentRef.current.querySelectorAll(
      `[data-focus-context='${this.getContext()}']`,
    );
    console.log("focusable items", nodeCollection, this.getContext());
    return Array.from(nodeCollection);
  }

  getNext() {
    const items = this.findFocusableElements();
    let nextIndex = 0;
    if (this.activeEl) {
      nextIndex = parseInt(this.getCurrentFocusIndex()) + 1;
      if (nextIndex >= items.length) {
        nextIndex = 0;
      }
    }

    const next = items[nextIndex];
    if (next) {
      this.activeEl = next;
    }
    return this.activeEl;
  }

  getPrevious() {
    const items = this.findFocusableElements();
    let prevIndex = 0;
    if (this.activeEl) {
      prevIndex = this.getCurrentFocusIndex() - 1;
      if (prevIndex < 0) {
        prevIndex = items.length - 1;
      }
    }
    this.activeEl = items[prevIndex];
    return this.activeEl;
  }
}

export default FocusAttributeManager;
