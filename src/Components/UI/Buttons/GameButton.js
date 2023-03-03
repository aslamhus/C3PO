import React from 'react';
import { useGameSound } from '../../hooks/useGameSound';

class GameButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
    };
    const { playSound } = useGameSound();
    this.playSound = playSound;
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event) {
    await this.playSound(this.state.sound);
    if (this.state.onClick instanceof Function) {
      this.state.onClick(event);
    }
  }

  static getDerivedStateFromProps(props, state) {
    return { ...state, ...props };
  }

  render() {
    const { ref, style, className, id, value, key, children, disabled } = this.state;
    return (
      <button
        // ref={ref}
        onClick={this.handleClick}
        style={style}
        className={className}
        id={id}
        value={value}
        key={key}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}

export default GameButton;
