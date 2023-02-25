import React from 'react';
import './control-strip-group.css';

export default function ControlStripGroup({ className, style }) {
  return (
    <div className="control-strip-group ">
      <SmallPanel className="shadow" style={{ borderRadius: '30px 30px 0  0' }}></SmallPanel>
      <div className="large-panel panel shadow">
        <div className="panel-bg">
          <div className="control-button shadow"></div>
          <div className="control-button shadow"></div>
        </div>
      </div>
      <SmallPanel className="shadow"></SmallPanel>
    </div>
  );
}

const SmallPanel = ({ style, className }) => {
  return (
    <div className={`small-panel panel${className ? ` ${className}` : ''}`} style={style}>
      <div className="panel-bg">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
