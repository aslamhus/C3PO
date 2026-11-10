import gsap from "gsap";
export const createWaveTimeline = (bodyParts) => {
  /** left shoulder */

  const { leftShoulder, rightShoulder } = bodyParts;
  const waveTimeline = gsap.timeline();
  const leftArmWave = gsap.timeline({ repeat: -1, yoyo: true });
  leftArmWave.to(
    leftShoulder.joint,
    { scaleY: 1, rotate: "-5deg", duration: 0.5, yoyoEase: true },
    0,
  );
  leftArmWave.to(
    leftShoulder.arm,
    { rotate: "-5deg", duration: 0.5, yoyoEase: true },
    0,
  );
  leftArmWave.to(
    leftShoulder.forearm,
    { rotate: "-30deg", duration: 0.5, yoyoEase: true },
    0,
  );
  leftArmWave.to(
    leftShoulder.hand,
    { rotate: "-15deg", duration: 0.25, yoyoEase: true },
    0,
  );
  /** right shoulder */
  const rightArmTimeline = gsap.timeline({ delay: 0 });
  const rightArmDuration = 0.5;
  rightArmTimeline.to(
    rightShoulder.joint,
    { rotate: "-5deg", duration: rightArmDuration },
    0,
  );
  rightArmTimeline.to(
    rightShoulder.arm,
    { rotate: "-5deg", duration: rightArmDuration },
    0,
  );
  rightArmTimeline.to(
    rightShoulder.forearm,
    { rotate: "25deg", duration: rightArmDuration },
    0,
  );
  rightArmTimeline.to(
    rightShoulder.hand,
    { rotate: "5deg", duration: rightArmDuration },
    0,
  );
  rightArmTimeline.addLabel("endRightArmMove", ">+=1");
  // slowly deflate back to original position
  const deflateDuration = 3;
  rightArmTimeline.to(
    rightShoulder.joint,
    { rotate: "0deg", duration: deflateDuration },
    "endRightArmMove",
  );
  rightArmTimeline.to(
    rightShoulder.arm,
    { rotate: "0deg", duration: deflateDuration },
    "endRightArmMove",
  );
  rightArmTimeline.to(
    rightShoulder.forearm,
    { rotate: "0deg", duration: deflateDuration },
    "endRightArmMove",
  );
  rightArmTimeline.to(
    rightShoulder.hand,
    { rotate: "0deg", duration: deflateDuration },
    "endRightArmMove",
  );
  // add individual movements to overall timeline
  waveTimeline.add(leftArmWave, 0, { ...options });
  waveTimeline.add(rightArmTimeline, 0);
  waveTimeline.addLabel("end", ">");
  waveTimeline.play();
  return waveTimeline;
};
