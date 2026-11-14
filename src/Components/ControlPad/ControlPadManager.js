/**
 *
 * @typedef {Object} Handlers
 * @property {Function} up
 * @property {Function} down
 * @property {Function} left
 * @property {Function} right
 * @property {Function} confirm
 * @property {Function} cancel
 *
 * @typedef {Object} Scope
 * @property {string} scopeName
 * @property {Handlers} handlers
 *
 *
 */

class ControlPadManager {
  /** @type {Array<Scope>}  */
  inputStack;

  /** @type {Scope}  */
  currentScope;

  constructor({ onPop, onPush }) {
    this.onPop = onPop;
    this.onPush = onPush;
    this.currentScope = null;
    this.inputStack = [];
  }

  /**
   * Appends new scope to input stack and returns new scope
   * @param {*} scopeName
   * @param {*} handlers
   * @returns {Object|null} scope
   */
  push(scopeName, handlers) {
    console.log("%cpush scope " + scopeName, `color:green`);
    this.inputStack.push({ scopeName, handlers });
    this.currentScope = this.getCurrentScope();
    // dispatch current scope state in react
    if (this.onPush instanceof Function) {
      this.onPush(this.currentScope);
    }
    return this.currentScope;
  }

  /**
   * @param {string} scopeName
   * @returns {int}
   */
  findScopeIndex(scopeName) {
    return this.inputStack.findIndex((scope) => scope.scopeName == scopeName);
  }

  /**
   *
   * @returns {Object|null} - the popped scope
   */
  pop(scopeName, handlers) {
    const scopeIndex = this.findScopeIndex(scopeName);
    if (scopeIndex == -1) return;

    console.log("%cpop scope " + scopeName, `color:red`);
    const popped = this.inputStack.splice(scopeIndex, 1);
    this.currentScope = this.getCurrentScope();
    if (this.onPop instanceof Function) {
      this.onPop(popped);
    }
    return popped;
  }

  /**
   *
   * @returns {Scope}
   */
  getCurrentScope() {
    if (!this.inputStack.length) return;
    return this.inputStack[this.inputStack.length - 1];
  }

  getHandler(handlerName, ...args) {
    const { scopeName, handlers } = this.getCurrentScope() ?? {};
    if (!handlers || !handlers.hasOwnProperty(handlerName)) return;
    if (scopeName) {
      console.log(
        `%c${handlerName}-${scopeName}`,
        "color:grey;font-weight:bold;",
      );
    }
    const controlPadAction = handlers[handlerName];
    if (controlPadAction instanceof Function) {
      return controlPadAction(...args);
    }
  }

  up(...args) {
    return this.getHandler("up", ...args);
  }

  down(...args) {
    return this.getHandler("down", ...args);
  }

  left(...args) {
    return this.getHandler("left", ...args);
  }

  right(...args) {
    return this.getHandler("right", ...args);
  }

  confirm(...args) {
    return this.getHandler("confirm", ...args);
  }

  cancel(...args) {
    return this.getHandler("cancel", ...args);
  }
}

export default ControlPadManager;
