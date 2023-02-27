import React, { useState, useEffect } from 'react';
import './clock.css';

export default function Clock({}) {
  let interval;

  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(getTime, 1000);
  }, []);

  const getTime = () => {
    const date = new Date();
    let hours = date.getHours();

    const mins = date.getMinutes();
    const seconds = date.getSeconds();
    setTime(`${prefixZero(hours)}:${prefixZero(mins)}:${prefixZero(seconds)}`);
  };

  const prefixZero = (number) => {
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  };

  return <div className="clock">{time}</div>;
}
