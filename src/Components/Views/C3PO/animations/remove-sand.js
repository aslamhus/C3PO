import gsap from "gsap";
import { createThinkTimeline } from "./think";

export const createRemoveSandTimeline = (bodyParts) => {
  const {
    body: { body },
    head: { head, leftEyeBall, rightEyeBall },
    hips: { hips, leftLeg, rightLeg },
    torso: { torso, chest, stomach },
    leftShoulder,
    rightShoulder,
  } = bodyParts;
  const thinkTimeline = createThinkTimeline(duration);
  thinkTimeline.addLabel("raiseLeftArm", 0);
  thinkTimeline.set(leftShoulder.joint, { scaleY: 1 }, "raiseLeftArm");
  const apoplexyTL = gsap.timeline({ repeat: -1, yoyo: true });
  apoplexyTL.set(leftShoulder.forearm, { rotate: "20deg" }, 0);
  apoplexyTL.to(
    leftShoulder.joint,
    { rotate: "-10deg", duration: 0.5, yoyoEase: true },
    0,
  );
  apoplexyTL.set(leftShoulder.arm, { rotate: "-15deg", x: "2px", y: "7px" }, 0);
  apoplexyTL.to(
    leftShoulder.forearm,
    { rotate: "-15deg", duration: 0.35, yoyoEase: true },
    0,
  );
  apoplexyTL.to(
    leftShoulder.hand,
    { rotate: "-20deg", duration: 0.25, yoyoEase: true },
    0,
  );
  const headShake = gsap.timeline({ repeat: -1 });
  headShake.to(head, { rotate: "5deg", delay: 0.65, duration: 0.1 });
  headShake.to(head, { rotate: "1deg", duration: 0.25 });
  headShake.to(
    leftEyeBall,
    { x: "1px", y: "0.5px", duration: 0.1, yoyo: true },
    0.55,
  );
  headShake.to(
    rightEyeBall,
    { x: "1px", y: "0.5px", duration: 0.1, yoyo: true },
    0.55,
  );
  thinkTimeline.add(headShake, 0.2);
  thinkTimeline.add(apoplexyTL, 0);

  thinkTimeline.play();
};
