import gsap from "gsap";
import { speed } from "@config";
import { getBoundsRelativeToParent } from "../../GameStage/utils";
import C3POActionTimeline from "./C3POActionTimeline";
import { createSand } from "./elements/sand/sand";
import { createRestTimeline } from "./animations/rest";
import { createThinkTimeline } from "./animations/think";
import { createWaveTimeline } from "./animations/wave";
import { createProposeIdeaTimeline } from "./animations/propose-idea";
import { createCelebrateTimeline } from "./animations/celebrate";
import { createRemoveSandTimeline } from "./animations/remove-sand";
import { createFretTimeline } from "./animations/fret";
import { createBreatheTimeline } from "./Body/breathe";
import { createDazedTimeline } from "./animations/dazed";
import { createCollapseTimeline } from "./animations/collapse";

class C3POAnimate {
  /**
   *
   * @param {React.RefObject<HTMLElement>} bodyRef - body ref
   * @param {HTMLElement} constrainEl - the element to reference as C3PO's coordinate system.
   */
  constructor(bodyRef, constrainEl) {
    this.constrainEl = constrainEl;
    this.body = bodyRef.current;
    this.mainTimeline = new C3POActionTimeline();

    this.automonicTimeline = new C3POActionTimeline({ repeat: -1, yoyo: true });
    this.x = 0;

    this.y = 0;
    this.bodyParts = {
      body: {
        body: this.body,
      },
      head: {
        head: this.body.querySelector(".head"),
        leftEye: this.body.querySelector(".left-eye"),
        leftEyeBall: this.body.querySelector(".left-eyeball"),
        rightEye: this.body.querySelector(".right-eye"),
        rightEyeBall: this.body.querySelector(".right-eyeball"),
      },
      torso: {
        torso: this.body.querySelector(".torso"),
        chest: this.body.querySelector(".body-part.torso"),
        stomach: this.body.querySelector(".stomach"),
      },
      leftShoulder: {
        joint: this.body.querySelector(".left-shoulder-joint"),
        arm: this.body.querySelector(".left-arm"),
        mainArm: this.body.querySelector(".left-main-arm"),
        forearm: this.body.querySelector(".left-fore-arm"),
        hand: this.body.querySelector(".left-hand"),
      },
      rightShoulder: {
        joint: this.body.querySelector(".right-shoulder-joint"),
        arm: this.body.querySelector(".right-arm"),
        mainArm: this.body.querySelector(".right-main-arm"),
        forearm: this.body.querySelector(".right-fore-arm"),
        hand: this.body.querySelector(".right-hand"),
      },
      hips: {
        hips: this.body.querySelector(".hips"),
        leftLeg: this.body.querySelector(".left-leg"),
        rightLeg: this.body.querySelector(".right-leg"),
      },
    };
    this.mainTimeline.timeline.eventCallback("onUpdate", () => {
      const x = gsap.getProperty(this.body, "x");
      // console.log("x", x);
      // if (x <= parseInt(0)) {
      //   debugger;
      // }
    });
  }

  play() {
    this.timeline.play();
    return this.timeline;
  }

  stopSpeaking() {
    const speakTimeline = this.mainTimeline.getAction("speak");
    if (speakTimeline) {
      speakTimeline.revert();
      this.mainTimeline.removeAction("speak", speakTimeline);
    }
  }

  /**
   * C3PO returns to original position
   * and clear timeline.
   *
   * @param {React.RefObject<HTMLElement>} bodyRef - body ref
   * @returns {Promise}
   */
  reset(options = { duration: 1 * speed, ease: "slow" }) {
    const { duration, ease } = options;
    return new Promise((resolve) => {
      this.automonicTimeline.clear();
      this.mainTimeline.clear();
      const allBodyParts = this.getAllBodyParts();
      console.log("reset");
      // gsap.set(this.bodyParts.leftShoulder.mainArm, { x: 0, y: 0 });
      gsap
        .to(allBodyParts, {
          rotate: "0deg",
          filter: "",
          scaleX: 1,
          scaleY: 1,
          delay: 0,
          duration,
          x: 0,
          y: 0,
          ease,
        })
        .then(() => {
          // if (this.x != null && this.x != undefined) {
          //   gsap.set(this.body, { x: this.x });
          // }
          resolve(true);
        });
    });
  }

  dazed() {
    const tl = createDazedTimeline(this.bodyParts);
    this.mainTimeline.addAction(tl, "dazed");
  }

  /**
   *
   * @param {Function} playSound
   * @returns
   */
  collapse(playSound) {
    this.mainTimeline.clear();
    this.automonicTimeline.clear();
    const tl = createCollapseTimeline(this.bodyParts, playSound);
    this.mainTimeline.addAction(tl, "collapse");
    return tl;
  }

  look(direction, speed = 0.25) {
    const {
      head: { leftEyeBall, rightEyeBall },
    } = this.bodyParts;
    switch (direction) {
      case "right":
        gsap.to(leftEyeBall, { x: "2px", y: 0, duration: 1 * speed });
        gsap.to(rightEyeBall, { x: "2px", y: 0, duration: 1 * speed });
        break;

      case "straight":
        gsap.to(leftEyeBall, { x: "0", y: 0, duration: 1 * speed });
        gsap.to(rightEyeBall, { x: "0", y: 0, duration: 1 * speed });
        break;
    }
  }

  /**
   *
   * @returns {Array} - array of all body parts
   */
  getAllBodyParts() {
    return Object.keys(this.bodyParts).reduce((acc, key) => {
      acc.push(...Object.values(this.bodyParts[key]).map((value) => value));
      return acc;
    }, []);
  }

  async rest(duration = 0.5 * speed) {
    this.mainTimeline.clear();
    const restTimeline = createRestTimeline(this.bodyParts, {
      duration,
    });
    this.mainTimeline.addAction(restTimeline, "rest");
    this.mainTimeline.play();
    return restTimeline;
  }

  // addActionToTimeline(childTl, label, ){

  //   this.timeline.add(childTl, label)
  // }

  /**
   * C3PO Waves
   *
   
   * @returns {GSAPTimeline}
   */
  wave(options = { delay: 0 }) {
    const waveTimeline = createWaveTimeline(this.bodyParts, options);
    this.mainTimeline.addAction(waveTimeline, "wave");
    return this.timeline;
  }

  proposeIdea(duration = 1 * speed) {
    const proposeTl = createProposeIdeaTimeline(this.bodyParts, {
      duration,
    });
    this.mainTimeline.addAction(proposeTl, "proposeIdea");
    return proposeTl;
  }

  // headScratch() {
  //   // first check if c3po is proposing an idea
  //   const { leftShoulder, rightShoulder } = this.bodyParts;
  //   const headScratchTimeline = gsap.timeline({ yoyo: true, repeat: -1 }, 0);
  //   headScratchTimeline.to(
  //     rightShoulder.forearm,
  //     { rotation: "+=1", duration: 0.5 },
  //     0,
  //   );
  //   headScratchTimeline.to(
  //     rightShoulder.hand,
  //     { rotation: "+=2", duration: 0.5 },
  //     0,
  //   );
  //   headScratchTimeline.to(
  //     rightShoulder.forearm,
  //     { rotation: "-=1", duration: 0.5 },
  //     0.5,
  //   );
  //   headScratchTimeline.to(
  //     rightShoulder.hand,
  //     { rotation: "-=2", duration: 0.5 },
  //     0.5,
  //   );
  //   headScratchTimeline.to(rightShoulder.hand, { opacity: 1, duration: 2 });
  //   headScratchTimeline.play();
  //   return headScratchTimeline;
  // }

  /**
   * Walk from current with delta
   *
   * @param {String|Number} xPosition - walk to position on game stage. Can
   */
  async walk(xPosition, options = { steps: 7, duration: 2 * speed }) {
    const bodyBounds = this.getBounds(this.body);
    const distance = xPosition - bodyBounds.x - window.scrollX;
    const totalDuration = options.duration || 2;
    const steps = options.steps ?? 7;
    // build timeline
    const walkTimeline = gsap.timeline();
    // walkTimeline.set(this.body, { x: bodyBounds.x });
    for (let i = 1; i <= steps; i++) {
      const x = distance / steps;
      const duration = totalDuration / steps;
      const isEven = i % 2 == 0;
      walkTimeline.to(this.body, {
        x: `+=${x}px`,
        y: isEven ? "-20" : "+10",
        duration,
        ease: true,
        onUpdate: () => {
          this.x = gsap.getProperty(this.body, "x");
        },
      });
    }
    // walkTimeline.to(this.body, { x: xPosition, rotate: '0deg' });
    return walkTimeline.play();
  }

  /**
   * Walk to a position
   *
   * @param {*} x
   * @param {*} options
   * @returns
   */
  async walkTo(x, options = { steps: 7, duration: 2 * speed }) {
    return this.walk(x - this.x ?? 0, options);
  }

  breathe() {
    const breatheTl = createBreatheTimeline(this.bodyParts);
    this.automonicTimeline.addAction(breatheTl, "breathe");
    this.automonicTimeline.play();
  }

  speak() {
    return new Promise((resolve) => {
      const {
        body: { body },
        head: { head },
        hips: { hips, leftLeg, rightLeg },
        torso: { torso, chest, stomach },
        leftShoulder,
        rightShoulder,
      } = this.bodyParts;
      const speakTimeline = gsap.timeline({
        repeat: -1,
      });
      speakTimeline.to(
        head,
        {
          scaleY: 1.025,
          duration: 0.2,
          yoyo: true,
        },
        0,
      );
      speakTimeline.to(head, { scaleX: 0.975, duration: 0.2, yoyo: true }, 0.1);
      speakTimeline.play();
      this.mainTimeline.play();
      this.mainTimeline.addAction(speakTimeline, "speak");
    });
  }

  celebrate(repeat) {
    return new Promise((resolve) => {
      this.mainTimeline.clear();
      if (this.currentActionName == this.celebrate.name) resolve(true);
      this.mainTimeline.clear();
      this.look("straight");
      const celebrateTl = createCelebrateTimeline(this.bodyParts, {
        yoyo: true,
        repeat: repeat || -1,
        onComplete: () => {
          this.rest();
          resolve();
        },
      });
      this.mainTimeline.addAction(celebrateTl, "celebrate");
    });
  }

  think(duration = 1 * speed) {
    // note that think never resolves, because the headscrtch animation is an infinite loop.
    this.mainTimeline.clear();
    const thinkTimeline = createThinkTimeline(this.bodyParts, { duration });
    thinkTimeline.set(
      this.bodyParts.leftShoulder.joint,
      { scaleY: -1, duration: 0 },
      0,
    );
    this.mainTimeline.addAction(thinkTimeline, "think");
    return thinkTimeline;
  }

  removeSand(duration = 1 * speed) {
    // note that think never resolves, because the headscrtch animation is an infinite loop.
    return new Promise((resolve) => {
      const sand = createSand();
      this.bodyParts.head.head.appendChild(sand);
      this.mainTimeline.clear();
      const removeSandTl = createRemoveSandTimeline(this.bodyParts, {
        duration,
      });
      const onComplete = () => {
        sand.remove();
        resolve(true);
      };
      removeSandTl.eventCallback("onComplete", onComplete);
      removeSandTl.eventCallback("onInterrupt", onComplete);
      this.mainTimeline.addAction(removeSandTl, "removeSand");
    });
  }

  fret() {
    this.mainTimeline.pause();
    this.mainTimeline.clear();

    this.rest(0);
    const fretTl = createFretTimeline(this.bodyParts);
    this.mainTimeline.addAction(fretTl, "fret");
  }

  animate(bodyPart, options) {
    if (!(bodyPart instanceof HTMLElement)) {
      throw new Error("bodyPart must be instance of HTMLElement");
    }
    const { onComplete, duration, ...animateOptions } = options;
    const tl = gsap.timeline();
    tl.to(bodyPart, {
      ...animateOptions,

      duration: duration ?? 0,
      onComplete: () => {
        console.log("animate action complete");
      },
    });
    this.mainTimeline.addAction(
      tl,
      "animate_" + crypto.randomUUID().slice(0, 5),
    );
    console.log("timeline", this.mainTimeline.timeline);
    return tl;
  }

  getBounds(bodyPart) {
    return getBoundsRelativeToParent(bodyPart, this.constrainEl);
  }
}

export default C3POAnimate;
