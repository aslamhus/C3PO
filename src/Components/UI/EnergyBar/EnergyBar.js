import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './energy-bar.css';

export default function EnergyBar({ now = 1 }) {
  const energyBarRef = useRef();
  const energyGlowTimeline = useRef(gsap.timeline());
  const [energy, setEnergy] = useState(1);

  const parseEnergyValue = () => {
    let energy = now;
    if (now > 1) {
      energy = 1;
    } else if (now < 0) {
      energy = 0;
    }
    return energy;
  };

  const handleAnimations = () => {
    animateEnergyChange();
    energyGlowTimeline.current.clear();
    if (energy < 0.49 && energy > 0.25) {
      animateEnergyGlow();
    } else if (energy <= 0.25 && energy > 0.1) {
      animateEnergyGlow({ duration: 0.75, color: 'yellow' });
    } else if (energy <= 0.1) {
      animateEnergyGlow({ duration: 0.5, color: 'white' });
    }
  };

  const animateEnergyGlow = (options = { duration: 1, color: 'rgb(84, 6, 84)' }) => {
    energyGlowTimeline.current.clear();
    const energyOutline = energyBarRef.current.parentElement;
    energyGlowTimeline.current.to(energyOutline, {
      borderColor: options.color,
      duration: options.duration,
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.05,
    });
    energyGlowTimeline.current.play();
  };

  const animateEnergyChange = () =>
    gsap.to(energyBarRef.current, { scaleX: energy, duration: 0.5 });

  useEffect(() => {
    if (energy) {
      handleAnimations();
    }
  }, [energy]);

  useEffect(() => {
    setEnergy(parseEnergyValue(now));
  }, [now]);

  return (
    <div className="energy-bar-container">
      <div>
        <h3>C3PO Battery</h3>
        <EnergyPercent energy={energy} />
      </div>
      <div className="energy-bar">
        <div ref={energyBarRef} className="energy"></div>
      </div>
    </div>
  );
}

const EnergyPercent = ({ energy }) => {
  let color = 'green';
  const getEnergyColor = () => {
    switch (true) {
      case energy > 0.75:
        return 'green';
      case energy > 0.5 && energy < 0.75:
        return 'yellow';
      case energy > 0.3 && energy <= 0.5:
        return 'orange';
      case energy <= 0.3:
        return 'red';
    }
  };

  return <h4 style={{ color: getEnergyColor() }}>{parseInt(energy * 100)}%</h4>;
};
