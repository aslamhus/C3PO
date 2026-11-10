import gsap from "gsap";

export const createDazedTimeline = (bodyParts) => {
  const {
    head: { head, leftEyeBall, rightEyeBall },
  } = bodyParts;
  const tl = gsap.timeline({
    repeat: -1,
  });
  const eyeroll = gsap.timeline({
    repeat: -1,
    repeatDelay: 0, // No delay between loops
    defaults: {
      ease: "none", // Keep speed constant
    },
  });
  eyeroll.set(leftEyeBall, {
    x: "3px",
    y: "-0,.5px",
    transformOrigin: "30% 50%",
  });
  eyeroll.set(rightEyeBall, {
    x: "2px",
    y: "-0.5px",
    transformOrigin: "30% 50%",
  });
  eyeroll.to(leftEyeBall, { rotate: "360deg", duration: 1 }, 0);
  eyeroll.to(rightEyeBall, { rotate: "360deg", duration: 1 }, 0);
  eyeroll.timeScale(1.2);
  tl.add(eyeroll, 0);
  const headShake = gsap.timeline({ yoyo: true, repeat: -1 });
  headShake.to(head, { rotate: "3deg", duration: 1 });
  headShake.to(head, { rotate: "-3deg", duration: 1 });
  tl.add(headShake, 0);
  tl.play();
  return tl;
};
