import gsap from "gsap";

export const createCelebrateTimeline = (
  bodyParts,
  options = { yoyo: true, repeat: -1 },
) => {
  const {
    body: { body },
    head: { head },
    hips: { hips, leftLeg, rightLeg },
    torso: { torso, chest, stomach },
    leftShoulder,
    rightShoulder,
  } = bodyParts;
  const tl = gsap.timeline(options);

  const prepareDuration = 0.3;
  // set initial position
  gsap.set(body, { y: "0" }, 0);
  gsap.set(leftLeg, { rotate: "-5deg", y: "0" }, 0);
  gsap.set(rightLeg, { rotate: "5deg", y: "0" }, 0);
  gsap.set(leftShoulder.joint, { scaleY: 1, rotate: "-20deg" }, 0);
  gsap.set(leftShoulder.mainArm, { rotate: "5deg" }, 0);
  gsap.set(leftShoulder.forearm, { rotate: "-10deg" }, 0);
  gsap.set(rightShoulder.joint, { rotate: "10deg" }, 0);
  gsap.set(rightShoulder.arm, { rotate: "-20deg" }, 0);
  gsap.set(rightShoulder.forearm, { rotate: "50deg" }, 0);

  // prepare (down)
  tl.to(body, { y: "5", duration: prepareDuration }, 0);
  tl.to(leftLeg, { rotate: "-5deg", y: "0", duration: prepareDuration }, 0);
  tl.to(rightLeg, { rotate: "5deg", y: "0", duration: prepareDuration }, 0);
  tl.to(
    leftShoulder.joint,
    { scaleY: 1, rotate: "-20deg", duration: prepareDuration },
    0,
  );
  tl.to(leftShoulder.mainArm, { rotate: "5deg", duration: prepareDuration }, 0);
  tl.to(
    leftShoulder.forearm,
    { rotate: "-10deg", duration: prepareDuration },
    0,
  );
  tl.to(rightShoulder.joint, { rotate: "10deg", duration: prepareDuration }, 0);
  tl.to(rightShoulder.arm, { rotate: "-20deg", duration: prepareDuration }, 0);
  tl.to(
    rightShoulder.forearm,
    { rotate: "50deg", duration: prepareDuration },
    0,
  );
  tl.addLabel("prepare");
  // raise arms
  const raiseDuration = 0.3;
  tl.to(body, { y: "-15", duration: prepareDuration }, "prepare");
  tl.to(
    leftLeg,
    { rotate: "5deg", y: "+=10", duration: prepareDuration },
    "prepare",
  );
  tl.to(
    rightLeg,
    { rotate: "-5deg", y: "+=10", duration: prepareDuration },
    "prepare",
  );
  tl.to(
    leftShoulder.joint,
    { rotate: "0", duration: prepareDuration },
    "prepare",
  );
  tl.to(
    leftShoulder.mainArm,
    { rotate: "5deg", duration: prepareDuration },
    "prepare",
  );
  tl.to(
    leftShoulder.forearm,
    { rotate: "-60deg", duration: prepareDuration },
    "prepare",
  );
  tl.to(
    rightShoulder.joint,
    { scaleY: 1, rotate: "10deg", duration: prepareDuration },
    "prepare",
  );
  tl.to(
    rightShoulder.arm,
    { rotate: "-40deg", duration: prepareDuration },
    "prepare",
  );
  tl.to(
    rightShoulder.forearm,
    { rotate: "100deg", duration: prepareDuration },
    "prepare",
  );
  tl.play();
  return tl;
};
