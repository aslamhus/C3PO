import gsap from "gsap";

export const createBreatheTimeline = (bodyParts) => {
  const breathDuration = 4;
  const hipsShiftDuration = 4;
  const {
    head: { head },

    hips: { hips, leftLeg, rightLeg },
  } = bodyParts;
  /** head shake */
  const headShake = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 5 });
  headShake.to(head, {
    rotate: "-=1deg",
    duration: breathDuration / 5,
    delay: 0.2,
  });
  headShake.to(head, { rotate: "+=2deg", duration: breathDuration / 5 });
  headShake.to(head, { rotate: "-=1deg", duration: breathDuration / 5 });
  headShake.to(head, { rotate: "+=1deg", duration: breathDuration / 5 });
  return headShake;
};

const createTorsoBreath = (bodyParts) => {
  const {
    head: { head },
    torso: { torso, stomach },
  } = bodyParts;
  const torsoBreathe = gsap.timeline({
    repeat: -1,
    repeatDelay: 4,
    ease: true,
  });
  // breathe in
  torsoBreathe.to(
    torso,
    { scale: "+=0.005", y: "-=0.5", duration: 0.5, delay: 0.5 },
    0,
  );
  torsoBreathe.to(head, { y: "-=0.5", duration: 0.5, delay: 0.5 }, 0);
  torsoBreathe.addLabel("breatheIn", ">");
  // breathe out
  torsoBreathe.to(
    torso,
    { scale: "-=0.005", y: "+=0.5", duration: 1.25, delay: 0.2 },
    "breatheIn",
  );
  torsoBreathe.to(
    head,
    { y: "+=0.5", duration: 1.25, delay: 0.5 },
    "breatheIn",
  );
  return torsoBreathe;
};
