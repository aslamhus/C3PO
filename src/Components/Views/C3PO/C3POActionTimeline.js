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
      paused: true,
      onComplete: () => {
        console.log("MAIN TIMELINE COMPLETE");
      },
      ...(timelineOptions ?? {}),
    });
    this.actions = {};
  }

  play() {
    return this.timeline.play();
  }

  clear() {
    console.info("clear");
    Object.entries(this.actions).forEach(([label, tl]) => {
      tl.revert();
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
    console.info("add action", label);
    if (this.actions[label]) {
      if (this.actions[label].paused()) {
        throw new Error("previous action still playing: " + label);
      } else {
        // this.removeAction(this.actions[label], label);
      }
    }
    this.actions[label] = childTl;
    // make sure to play main timeline before adding child action
    // otherwise child action may automaticlaly complete.

    this.timeline.add(childTl, label);
    if (this.timeline.paused) {
      this.timeline.play();
    }
    // because gsap only allows one event callback, we must collect any previously added callbacks

    let onComplete = childTl.eventCallback("onComplete");
    childTl.eventCallback("onComplete", () => {
      console.log("remove action label", label);
      this.removeAction(childTl, label);
      if (onComplete instanceof Function) {
        onComplete();
      }
    });
  }

  /**
   * @param {GSAPTimeline} childTl - the childtimeline to remove
   * @param {string} label
   */
  removeAction(childTl, label) {
    // console.log("remove action", label);
    // if (!label) {
    //   throw new Error("Failed to remove action, invalid label: " + label);
    // }
    // delete this.actions[label];
    // Promise.reject(this.actions[label]);
    // this.timeline.remove(childTl);
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
