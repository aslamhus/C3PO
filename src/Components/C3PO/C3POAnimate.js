import gsap from 'gsap';

class C3POAnimate {
  /**
   *
   * @param {React.RefObject<HTMLElement>} bodyRef - body ref
   */
  constructor(bodyRef) {
    this.body = bodyRef.current;
    this.timeline = gsap.timeline();
    this.currentAction = null;
    this.breatheTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    this.bodyParts = {
      body: {
        body: this.body,
      },
      head: {
        head: this.body.querySelector('.head'),
        leftEye: this.body.querySelector('.left-eye'),
        leftEyeBall: this.body.querySelector('.left-eyeball'),
        rightEye: this.body.querySelector('.right-eye'),
        rightEyeBall: this.body.querySelector('.right-eyeball'),
      },
      torso: {
        torso: this.body.querySelector('.torso'),
        chest: this.body.querySelector('.body-part.torso'),
        stomach: this.body.querySelector('.stomach'),
      },
      leftShoulder: {
        joint: this.body.querySelector('.left-shoulder-joint'),
        arm: this.body.querySelector('.left-arm'),
        mainArm: this.body.querySelector('.left-main-arm'),
        forearm: this.body.querySelector('.left-fore-arm'),
        hand: this.body.querySelector('.left-hand'),
      },
      rightShoulder: {
        joint: this.body.querySelector('.right-shoulder-joint'),
        arm: this.body.querySelector('.right-arm'),
        mainArm: this.body.querySelector('.right-main-arm'),
        forearm: this.body.querySelector('.right-fore-arm'),
        hand: this.body.querySelector('.right-hand'),
      },
      hips: {
        hips: this.body.querySelector('.hips'),
        leftLeg: this.body.querySelector('.left-leg'),
        rightLeg: this.body.querySelector('.right-leg'),
      },
    };
  }

  play() {
    this.timeline.play();
    return this.timeline;
  }

  /**
   * Slow pause
   *
   * @param {Number} - time to pause
   */
  async pause(duration = 0.25) {
    return new Promise((resolve) => {
      gsap.to(this.timeline, { timeScale: 0.25, ease: true, duration }).then(() => {
        this.timeline.pause();
        this.timeline.timeScale(1);
        resolve(true);
      });
    });
  }

  /**
   * immediate stop
   */
  stop() {
    this.timeline.pause();
    this.currentAction?.pause();
    return this.timeline;
  }

  /**
   * C3PO returns to original position
   * and clear timeline.
   *
   * @param {React.RefObject<HTMLElement>} bodyRef - body ref
   * @returns {Promise}
   */
  reset(options = { duration: 1, ease: 'slow' }) {
    const { duration, ease } = options;
    return new Promise((resolve) => {
      this.timeline.clear();
      const allBodyParts = this.getAllBodyParts();
      gsap
        .to(allBodyParts, {
          rotate: '0deg',
          scaleX: 1,
          scaleY: 1,
          delay: 0,
          duration,
          x: 0,
          y: 0,
          ease,
        })
        .then(() => {
          resolve(true);
        });
    });
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

  async rest(duration = 0.5) {
    return new Promise((resolve) => {
      const { leftShoulder, rightShoulder, head } = this.bodyParts;
      const restTimeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          resolve(true);
        },
      });
      restTimeline.to(leftShoulder.joint, { scaleY: -1, duration, rotate: '-20deg' }, 0);
      restTimeline.to(leftShoulder.forearm, { scale: 0.9, duration, rotate: '-60deg' }, 0);
      restTimeline.to(rightShoulder.joint, { scaleY: 1, duration, rotate: '5deg' }, 0);
      restTimeline.to(rightShoulder.arm, { scale: 1, duration, rotate: '60deg' }, 0);
      restTimeline.to(rightShoulder.forearm, { rotate: '0', duration: duration }, 0);
      restTimeline.to(head.leftEyeBall, { y: '0', x: '0', duration }, 0);
      restTimeline.to(head.rightEyeBall, { y: '0', x: '0%', duration }, 0);
      restTimeline.play();
    });
  }

  /**
   * C3PO Waves
   *
   
   * @returns {GSAPTimeline}
   */
  wave(options = { delay: 0 }) {
    const duration = 2;
    this.timeline.pause();
    /** left shoulder */
    const { leftShoulder, rightShoulder } = this.bodyParts;
    const leftArmWave = gsap.timeline({ repeat: -1, yoyo: true });
    leftArmWave.to(
      leftShoulder.joint,
      { scaleY: 1, rotate: '-5deg', duration: 0.5, yoyoEase: true },
      0
    );
    leftArmWave.to(leftShoulder.arm, { rotate: '-5deg', duration: 0.5, yoyoEase: true }, 0);
    leftArmWave.to(leftShoulder.forearm, { rotate: '-30deg', duration: 0.5, yoyoEase: true }, 0);
    leftArmWave.to(leftShoulder.hand, { rotate: '-15deg', duration: 0.25, yoyoEase: true }, 0);
    /** right shoulder */
    const rightArmTimeline = gsap.timeline({ delay: 0 });
    const rightArmDuration = 0.5;
    rightArmTimeline.to(rightShoulder.joint, { rotate: '-5deg', duration: rightArmDuration }, 0);
    rightArmTimeline.to(rightShoulder.arm, { rotate: '-5deg', duration: rightArmDuration }, 0);
    rightArmTimeline.to(rightShoulder.forearm, { rotate: '25deg', duration: rightArmDuration }, 0);
    rightArmTimeline.to(rightShoulder.hand, { rotate: '5deg', duration: rightArmDuration }, 0);
    rightArmTimeline.addLabel('endRightArmMove', '>+=1');
    // slowly deflate back to original position
    const deflateDuration = 3;
    rightArmTimeline.to(
      rightShoulder.joint,
      { rotate: '0deg', duration: deflateDuration },
      'endRightArmMove'
    );
    rightArmTimeline.to(
      rightShoulder.arm,
      { rotate: '0deg', duration: deflateDuration },
      'endRightArmMove'
    );
    rightArmTimeline.to(
      rightShoulder.forearm,
      { rotate: '0deg', duration: deflateDuration },
      'endRightArmMove'
    );
    rightArmTimeline.to(
      rightShoulder.hand,
      { rotate: '0deg', duration: deflateDuration },
      'endRightArmMove'
    );
    // add individual movements to overall timeline
    this.timeline.add(leftArmWave, 0, { ...options });
    this.timeline.add(rightArmTimeline, 0);
    this.timeline.addLabel('end', '>');
    this.timeline.play();
    return this.timeline;
  }

  think(duration = 1) {
    return new Promise((resolve) => {
      const { leftShoulder, rightShoulder } = this.bodyParts;
      this.stop();
      const thinkTimeline = gsap.timeline();
      thinkTimeline.to(leftShoulder.joint, { scaleY: -1, rotate: '5deg', duration: 0.1 }, 0);
      thinkTimeline.to(leftShoulder.arm, { rotate: '-20deg', scale: 0.9, duration }, 0);
      thinkTimeline.to(leftShoulder.mainArm, { scale: 1, x: '0px', y: '20px', duration }, 0);
      thinkTimeline.to(
        leftShoulder.forearm,
        { scale: 0.9, scale: 1, rotate: '20deg', duration },
        0
      );
      thinkTimeline.addLabel('leftShouldEnd', '>');
      thinkTimeline.to(rightShoulder.joint, { rotate: '-30deg' }, 0);
      thinkTimeline.to(rightShoulder.arm, { rotate: '-50deg', x: '20px', scale: 1.2 }, 0);
      thinkTimeline.to(rightShoulder.mainArm, { rotate: '30deg', y: '-10px', x: '-15px' }, 0);
      thinkTimeline.to(rightShoulder.forearm, { rotate: '40deg', x: '-10px', y: '-10px' }, 0);
      thinkTimeline.to(rightShoulder.hand, { scale: 0.8, x: '5px' }, 0);
      thinkTimeline.addLabel('raiseArm', '>');
      /** head scratch */
      const headScratchTimeline = gsap.timeline({ yoyo: true, repeat: -1 }, 0);
      headScratchTimeline.to(rightShoulder.forearm, { rotation: '+=1', duration: 0.5 }, 0);
      headScratchTimeline.to(rightShoulder.hand, { rotation: '+=2', duration: 0.5 }, 0);
      headScratchTimeline.to(rightShoulder.forearm, { rotation: '-=1', duration: 0.5 }, 0.5);
      headScratchTimeline.to(rightShoulder.hand, { rotation: '-=2', duration: 0.5 }, 0.5);
      headScratchTimeline.to(rightShoulder.hand, { opacity: 1, duration: 2 });
      thinkTimeline.add(headScratchTimeline, 'raiseArm');
      this.timeline.add(thinkTimeline);
      this.timeline.play().then(() => resolve(true));
    });
  }

  proposeIdea(duration = 1) {
    return new Promise((resolve) => {
      const { leftShoulder, rightShoulder } = this.bodyParts;
      const thinkTimeline = gsap.timeline({
        onComplete: () => {
          resolve(true);
        },
      });
      thinkTimeline.to(leftShoulder.joint, { scaleY: -1, rotate: '10deg', duration: 0.1 }, 0);
      thinkTimeline.to(leftShoulder.arm, { rotate: '-20deg', scale: 0.9, duration }, 0);
      thinkTimeline.to(
        leftShoulder.forearm,
        { scaleX: 1, scale: 0.9, rotate: '20deg', duration },
        0
      );
      thinkTimeline.addLabel('leftShouldEnd', '>');
      thinkTimeline.to(rightShoulder.joint, { rotate: '-20deg' }, 0);
      thinkTimeline.to(rightShoulder.arm, { rotate: '3deg', x: '0px', scale: 1.2 }, 0);
      thinkTimeline.to(rightShoulder.forearm, { rotate: '70deg', x: '-10px', y: '-10px' }, 0);
      thinkTimeline.to(rightShoulder.hand, { scale: 0.8, x: '5px' }, 0);
      thinkTimeline.addLabel('raiseArm', '>');
      /** head scratch */

      thinkTimeline.play();
    });
  }

  headScratch() {
    // first check if c3po is proposing an idea
    const { leftShoulder, rightShoulder } = this.bodyParts;
    const headScratchTimeline = gsap.timeline({ yoyo: true, repeat: -1 }, 0);
    headScratchTimeline.to(rightShoulder.forearm, { rotation: '+=1', duration: 0.5 }, 0);
    headScratchTimeline.to(rightShoulder.hand, { rotation: '+=2', duration: 0.5 }, 0);
    headScratchTimeline.to(rightShoulder.forearm, { rotation: '-=1', duration: 0.5 }, 0.5);
    headScratchTimeline.to(rightShoulder.hand, { rotation: '-=2', duration: 0.5 }, 0.5);
    headScratchTimeline.to(rightShoulder.hand, { opacity: 1, duration: 2 });
    headScratchTimeline.play();
    return headScratchTimeline;
  }

  /**
   *
   * Walk to center
   *
   * @param {HTMLElement} gameStage - the game stage container. Needed to find its center point.
   */
  async walkToCenter(gameStage) {
    if (!gameStage) {
      throw new Error('GameStage is not defined');
    }
    // rest
    this.rest();
    // get positions
    const { leftShoulder, rightShoulder } = this.bodyParts;
    const gameStageBounds = gameStage.getBoundingClientRect();
    const bodyBounds = this.body.getBoundingClientRect();
    const centerX = gameStageBounds.width / 2 - bodyBounds.width;
    // build timeline
    const walkTimeline = gsap.timeline();
    const distance = centerX - bodyBounds.x;
    const totalDuration = 2;
    const steps = 7;

    for (let i = 1; i <= steps; i++) {
      const x = distance / steps;
      const duration = totalDuration / steps;
      const isEven = i % 2 == 0;
      walkTimeline.to(this.body, {
        x: `+=${x}`,
        y: isEven ? '-20' : '+10',
        duration,
        ease: true,
      });
    }
    // walkTimeline.to(this.body, { x: centerX, rotate: '0deg' });
    return walkTimeline.play();
  }

  breathe() {
    const breathDuration = 4;
    const hipsShiftDuration = 4;
    const {
      head: { head },

      hips: { hips, leftLeg, rightLeg },
    } = this.bodyParts;
    /** head shake */
    const headShake = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 5 });
    headShake.to(head, { rotate: '-=1deg', duration: breathDuration / 5, delay: 0.2 });
    headShake.to(head, { rotate: '+=3deg', duration: breathDuration / 5 });
    headShake.to(head, { rotate: '-=2deg', duration: breathDuration / 5 });
    headShake.to(head, { rotate: '+=2deg', duration: breathDuration / 5 });
    /** hips and legs */
    const hipsShift = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 7 });

    // hipsShift.to(hips, { rotate: '-=0.5', duration: 1 }, 'legShift', 0);
    hipsShift.to(rightLeg, { rotation: '-=1deg', y: '+=2', duration: 1 }, 0);
    hipsShift.to(leftLeg, { rotation: '-=1deg', duration: 0.7 });
    hipsShift.addLabel('legShift', '>');

    this.breatheTimeline.add(headShake, 0);
    this.breatheTimeline.add(hipsShift, 0);
    // this.breatheTimeline.add(this.getTorsoBreathe(), 0);
    this.breatheTimeline.play();
  }

  getTorsoBreathe() {
    const {
      head: { head },
      torso: { torso, stomach },
    } = this.bodyParts;
    const torsoBreathe = gsap.timeline({ repeat: -1, repeatDelay: 4, ease: true });
    // breathe in
    torsoBreathe.to(torso, { scale: '+=0.005', y: '-=0.5', duration: 0.5, delay: 0.5 }, 0);
    torsoBreathe.to(head, { y: '-=0.5', duration: 0.5, delay: 0.5 }, 0);
    torsoBreathe.addLabel('breatheIn', '>');
    // breathe out
    torsoBreathe.to(
      torso,
      { scale: '-=0.005', y: '+=0.5', duration: 1.25, delay: 0.2 },
      'breatheIn'
    );
    torsoBreathe.to(head, { y: '+=0.5', duration: 1.25, delay: 0.5 }, 'breatheIn');
    return torsoBreathe;
  }

  celebrate(repeat) {
    return new Promise((resolve) => {
      const {
        body: { body },
        head: { head },
        hips: { hips, leftLeg, rightLeg },
        torso: { torso, chest, stomach },
        leftShoulder,
        rightShoulder,
      } = this.bodyParts;
      this.stop();
      const tl = gsap.timeline({ yoyo: true, repeat: repeat || -1, onComplete: () => resolve() });
      // set initial position
      gsap.set(body, { y: '0', duration: prepareDuration }, 0);
      gsap.set(leftLeg, { rotate: '-5deg', y: '0', duration: prepareDuration }, 0);
      gsap.set(rightLeg, { rotate: '5deg', y: '0', duration: prepareDuration }, 0);
      gsap.set(leftShoulder.joint, { scaleY: 1, rotate: '-20deg', duration: prepareDuration }, 0);
      gsap.set(leftShoulder.mainArm, { rotate: '5deg', duration: prepareDuration }, 0);
      gsap.set(leftShoulder.forearm, { rotate: '-10deg', duration: prepareDuration }, 0);
      gsap.set(rightShoulder.joint, { rotate: '10deg', duration: prepareDuration }, 0);
      gsap.set(rightShoulder.arm, { rotate: '-20deg', duration: prepareDuration }, 0);
      gsap.set(rightShoulder.forearm, { rotate: '50deg', duration: prepareDuration }, 0);

      // prepare (down)
      const prepareDuration = 0.3;
      tl.to(body, { y: '5', duration: prepareDuration }, 0);
      tl.to(leftLeg, { rotate: '-5deg', y: '0', duration: prepareDuration }, 0);
      tl.to(rightLeg, { rotate: '5deg', y: '0', duration: prepareDuration }, 0);
      tl.to(leftShoulder.joint, { scaleY: 1, rotate: '-20deg', duration: prepareDuration }, 0);
      tl.to(leftShoulder.mainArm, { rotate: '5deg', duration: prepareDuration }, 0);
      tl.to(leftShoulder.forearm, { rotate: '-10deg', duration: prepareDuration }, 0);
      tl.to(rightShoulder.joint, { rotate: '10deg', duration: prepareDuration }, 0);
      tl.to(rightShoulder.arm, { rotate: '-20deg', duration: prepareDuration }, 0);
      tl.to(rightShoulder.forearm, { rotate: '50deg', duration: prepareDuration }, 0);
      tl.addLabel('prepare');
      // raise arms
      const raiseDuration = 0.3;
      tl.to(body, { y: '-15', duration: prepareDuration }, 'prepare');
      tl.to(leftLeg, { rotate: '5deg', y: '+=10', duration: prepareDuration }, 'prepare');
      tl.to(rightLeg, { rotate: '-5deg', y: '+=10', duration: prepareDuration }, 'prepare');
      tl.to(leftShoulder.joint, { rotate: '0', duration: prepareDuration }, 'prepare');
      tl.to(leftShoulder.mainArm, { rotate: '5deg', duration: prepareDuration }, 'prepare');
      tl.to(leftShoulder.forearm, { rotate: '-60deg', duration: prepareDuration }, 'prepare');
      tl.to(
        rightShoulder.joint,
        { scaleY: 1, rotate: '10deg', duration: prepareDuration },
        'prepare'
      );
      tl.to(rightShoulder.arm, { rotate: '-40deg', duration: prepareDuration }, 'prepare');
      tl.to(rightShoulder.forearm, { rotate: '100deg', duration: prepareDuration }, 'prepare');

      // tl.to(leftShoulder.mainArm, { , duration: prepareDuration }, 0);
      tl.play();
      this.currentAction = tl;
    });
  }

  fret() {
    const {
      body: { body },
      head: { head, leftEyeBall, rightEyeBall },
      hips: { hips, leftLeg, rightLeg },
      torso: { torso, chest, stomach },
      leftShoulder,
      rightShoulder,
    } = this.bodyParts;
    this.stop();
    const tl = gsap.timeline();
    // set initial position
    // prepare (down)
    this.rest(0);
    const prepareDuration = 0.3;
    tl.to(body, { y: '0', duration: prepareDuration }, 0);
    tl.to(leftEyeBall, { y: '10%', x: '10%', duration: prepareDuration }, 0);
    tl.to(rightEyeBall, { y: '10%', x: '10%', duration: prepareDuration }, 0);
    // tl.to(torso, { scaleY: 0.9, duration: prepareDuration }, 0);
    tl.to(leftLeg, { rotate: '0', y: '0', duration: prepareDuration }, 0);
    tl.to(rightLeg, { rotate: '0', y: '0', duration: prepareDuration }, 0);
    tl.to(leftShoulder.joint, { scaleY: -1, rotate: '-20deg', duration: prepareDuration }, 0);
    tl.to(leftShoulder.forearm, { rotate: '-70deg', duration: prepareDuration }, 0);
    tl.to(rightShoulder.joint, { scaleY: -1, rotate: '30deg', duration: prepareDuration }, 0);
    tl.to(rightShoulder.arm, { rotate: '-25deg', duration: prepareDuration }, 0);
    tl.to(rightShoulder.forearm, { rotate: '90deg', duration: prepareDuration }, 0);

    // tl.to(leftShoulder.mainArm, { rotate: '0', duration: prepareDuration }, 0);
    // tl.to(rightShoulder.joint, { rotate: '0', duration: prepareDuration }, 0);
    tl.addLabel('prepare');
    tl.play();
  }

  animate(bodyPart, options) {
    return new Promise((resolve) => {
      if (!(bodyPart instanceof HTMLElement)) {
        throw new Error('bodyPart must be instance of HTMLElement');
      }
      const { onComplete, ...animateOptions } = options;
      gsap.to(bodyPart, {
        ...animateOptions,
        onComplete: () => {
          if (onComplete instanceof Function) {
            onComplete();
          }
          resolve('complete');
        },
      });
    });
  }
}

export default C3POAnimate;
