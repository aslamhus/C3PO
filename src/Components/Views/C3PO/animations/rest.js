import gsap from "gsap";
export const createRestTimeline = (bodyParts, options = { duration }) => {
  const { duration } = options;
  const { leftShoulder, rightShoulder, head } = bodyParts;
  const restTimeline = gsap.timeline({
    paused: true,
  });
  restTimeline.to(
    leftShoulder.joint,
    { scaleY: -1, duration, rotate: "-20deg" },
    0,
  );
  restTimeline.set(leftShoulder.arm, { x: 0, y: 0, rotate: 0 });

  restTimeline.set(leftShoulder.mainArm, { x: 0, y: 0, rotate: 0 });
  restTimeline.set(leftShoulder.arm, { scale: 1, duration, rotate: "0" }, 0);
  restTimeline.to(
    leftShoulder.forearm,
    { scale: 0.9, duration, rotate: "-60deg" },
    0,
  );

  restTimeline.to(leftShoulder.hand, { rotation: 0, duration }, 0);
  restTimeline.to(
    rightShoulder.joint,
    { scaleY: 1, duration, rotate: "5deg" },
    0,
  );
  restTimeline.to(
    rightShoulder.arm,
    { scale: 1, x: 0, y: 0, duration, rotate: "70deg" },
    0,
  );
  restTimeline.to(
    rightShoulder.mainArm,
    { scale: 1, x: 0, y: 0, rotation: 0, duration },
    0,
  );
  restTimeline.to(
    rightShoulder.arm,
    { scale: 1, rotate: "20deg", duration: duration },
    0,
  );
  restTimeline.to(
    rightShoulder.forearm,
    { scale: 1, rotate: "0", duration: duration },
    0,
  );
  restTimeline.to(
    rightShoulder.hand,
    { scale: 1, rotate: "0", duration: duration },
    0,
  );
  restTimeline.to(head.leftEyeBall, { y: "0", x: "0", duration }, 0);
  restTimeline.to(head.rightEyeBall, { y: "0", x: "0%", duration }, 0);
  restTimeline.play();
  return restTimeline;
};
