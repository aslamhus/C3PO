import gsap from "gsap";
import * as types from "../types";
/**
 *
 * @param {types.BodyParts} bodyParts
 * @returns
 */
export const createCollapseTimeline = (bodyParts) => {
  const {
    body: { body },
    head: { head, leftEye, leftEyeBall, rightEye, rightEyeBall },
    hips: { hips, leftLeg, rightLeg },
    torso: { torso, chest, stomach },
    leftShoulder,
    rightShoulder,
  } = bodyParts;
  const tl = gsap.timeline({});
  tl.set(head.head, { transformOrigin: "50% 100%" });
  tl.to(head.head, {
    rotate: "5deg",
    y: "1px",
    duration: 0.2,
    ease: "bounce.out",
  });
  tl.add(eyeFlicker(leftEye), 0.4);
  tl.add(eyeFlicker(rightEye), 0.4);
  // hips bends
  tl.add(hipsBend(bodyParts), 0.4);
  // torso falls

  // arms fall down
  tl.add(armsFall(bodyParts), 0.4);
  // left arm hinges
  tl.to(
    leftShoulder.forearm,
    { rotate: "-30deg", duration: 1, ease: "bounce.out" },
    0.8,
  );

  tl.play();
  return tl;
};

const eyeFlicker = (eye) => {
  const tl = gsap.timeline({});
  tl.set(eye, { filter: "grayscale(0%) brightness(100%)" });
  tl.to(eye, {
    filter: "grayscale(100%) brightness(100%)",
    duration: 0.1,
    repeat: 4,
    yoyo: true,
  });
  tl.to(eye, {
    filter: "grayscale(100%) brightness(50%)",
    duration: 1,
    delay: 1,
    // ease: "power1.out",
  });
  return tl;
};

/**
 * @param {types.BodyParts} bodyParts
 */
const hipsBend = (bodyParts) => {
  const tl = gsap.timeline();
  tl.to(bodyParts.hips.leftLeg, { rotate: "-10deg", duration: 0.4 }, 0);
  tl.to(bodyParts.hips.rightLeg, { rotate: "-2deg", duration: 0.4 }, 0);
  tl.to(
    bodyParts.torso.torso,
    { x: 5, y: 20, rotate: "7deg", duration: 0.2 },
    0.1,
  );
  tl.to(bodyParts.hips.hips, { y: 2, rotate: "5deg", duration: 0.2 }, 0.1);
  tl.to(
    bodyParts.head.head,
    { y: 8, x: 5, rotate: "2deg", duration: 0.2 },
    0.1,
  );
  return tl;
};

const armsFall = (bodyParts) => {
  const { leftShoulder, rightShoulder } = bodyParts;
  const tl = gsap.timeline();
  tl.to(leftShoulder.joint, { scaleY: "-1", duration: 0.5 }, 0);
  tl.to(
    rightShoulder.joint,
    { scaleY: "-1", rotate: "15deg", duration: 0.5 },
    0,
  );
  tl.to(
    rightShoulder.mainArm,
    { rotate: "-20deg", x: 1, y: -10, duration: 0.5 },
    0,
  );

  tl.to(rightShoulder.forearm, { rotate: "50deg", duration: 0.5 }, 0);
  return tl;
};
