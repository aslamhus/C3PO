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
    this.timeline = gsap.timeline(timelineOptions);
    this.actions = {};
  }

  play() {
    return this.timeline.play();
  }

  clear() {
    Object.entries(this.actions).forEach(([key, action]) => {
      action.revert();
      this.removeAction(key);
    });
    console.info("clearing timeline", { actions: this.actions });

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
        this.removeAction(this.actions[label], label);
      }
    }
    this.actions[label] = childTl;
    this.timeline.add(childTl, label);
    // because gsap only allows one event callback, we must collect any previously added callbacks
    const onComplete = childTl.eventCallback("onComplete");
    childTl.eventCallback("onComplete", () => {
      this.removeAction(childTl, label);
      if (onComplete) {
        onComplete();
      }
      // console.log(`Action complete: ${label}`, this.actions);
    });
    if (this.timeline.paused) {
      this.timeline.play();
    }
  }

  /**
   * @param {GSAPTimeline} childTl - the childtimeline to remove
   * @param {string} label
   */
  removeAction(childTl, label) {
    delete this.actions[label];
    this.timeline.remove(childTl);
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
