import gsap from "gsap";

export const createFretTimeline = (bodyParts) => {
  const {
    body: { body },
    head: { head, leftEyeBall, rightEyeBall },
    hips: { hips, leftLeg, rightLeg },
    torso: { torso, chest, stomach },
    leftShoulder,
    rightShoulder,
  } = bodyParts;
  const tl = gsap.timeline();
  // set initial position
  // prepare (down)
  tl.set(leftShoulder.mainArm, { x: "-5px", y: "10px" });
  tl.set(leftShoulder.arm, {
    x: "5px",
    y: "-10px",
  });

  const prepareDuration = 0.3;
  tl.to(body, { y: "0", duration: prepareDuration }, 0);
  tl.to(leftEyeBall, { y: "10%", x: "10%", duration: prepareDuration }, 0);
  tl.to(rightEyeBall, { y: "10%", x: "10%", duration: prepareDuration }, 0);
  // tl.to(torso, { scaleY: 0.9, duration: prepareDuration }, 0);
  tl.to(leftLeg, { rotate: "0", y: "0", duration: prepareDuration }, 0);
  tl.to(rightLeg, { rotate: "0", y: "0", duration: prepareDuration }, 0);
  tl.to(
    leftShoulder.joint,
    { scaleY: -1, rotate: "-20deg", duration: prepareDuration },
    0,
  );

  tl.to(
    leftShoulder.forearm,
    { rotate: "-70deg", duration: prepareDuration },
    0,
  );
  tl.to(
    rightShoulder.joint,
    { scaleY: -1, rotate: "18deg", duration: prepareDuration },
    0,
  );
  tl.to(
    rightShoulder.arm,
    { rotate: "-28deg", duration: prepareDuration, x: "-6px", y: "-5px" },
    0,
  );
  tl.to(
    rightShoulder.forearm,
    { rotate: "80deg", duration: prepareDuration, x: "-1px", y: "2px" },
    0,
  );

  // tl.to(leftShoulder.mainArm, { rotate: '0', duration: prepareDuration }, 0);
  // tl.to(rightShoulder.joint, { rotate: '0', duration: prepareDuration }, 0);
  tl.addLabel("prepare");
  tl.play();
  return tl;
};
