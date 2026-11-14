import gsap from "gsap";

class C3POActionTimeline {
  /** @type {GSAPTimeline}*/
  timeline;

  /** @type {Object<string,GSAPTimeline>}*/
  actions;

  /**
   * @param {GSAPTimelineVars} timelineOptions
   */
  constructor(timelineOptions) {
    this.timeline = gsap.timeline({
      autoRemoveChildren: true,
      // paused: true,

      ...(timelineOptions ?? {}),
    });
    this.actions = {};
  }

  play() {
    return this.timeline.play();
  }

  clear() {
    Object.entries(this.actions).forEach(([label, tl]) => {
      tl.pause();
      this.removeAction(label);
    });

    return this.timeline.clear();
  }

  /**
   * Pause
   *
   * @param {Number} - time to pause
   */
  async pause(duration = 0) {
    return new Promise((resolve) => {
      gsap
        .to(this.timeline, { timeScale: 0.25, ease: true, duration })
        .then(() => {
          this.timeline.pause();
          this.timeline.timeScale(1);
          resolve(true);
        });
    });
  }

  /**
   * @param {GSAPTimeline} childTl
   * @param {string} label
   */
  addAction(childTl, label) {
    if (this.actions[label]) {
      if (this.actions[label].paused()) {
        throw new Error("previous action still playing: " + label);
      } else {
        this.removeAction(label);
      }
    }
    this.actions[label] = childTl;
    // make sure to play main timeline before adding child action
    // otherwise child action may automaticlaly complete.
    if (this.timeline.paused || this.timeline.isActive()) {
      this.timeline.play();
    }
    // childTl.progress(0);
    this.timeline.add(childTl, label);

    // because gsap only allows one event callback, we must collect any previously added callbacks

    let onComplete = childTl.eventCallback("onComplete");
    childTl.eventCallback("onComplete", () => {
      this.removeAction(label);
      if (onComplete instanceof Function) {
        onComplete();
      }
    });
  }

  /**
   * @param {string} label
   */
  removeAction(label) {
    if (!label) {
      return;
    }
    const childTl = this.actions[label];
    this.timeline.remove(childTl);
    if (childTl) childTl.kill();
    delete this.actions[label];
  }

  /**
   * @param {gsap.CallbackType} type
   * @param {gsap.Callback} callback
   */
  eventCallback(type, callback) {
    this.timeline.eventCallback(type, callback);
  }

  /**
   *
   * @param {string} label
   * @returns {GSAPTimeline|null}
   */
  getAction(label) {
    return this.actions[label] ?? null;
  }
}

export default C3POActionTimeline;
