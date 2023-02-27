import React from 'react';
import './control-strip-group.css';

export default function ControlStripGroup({ className, style, children }) {
  return (
    <div className="control-strip-group ">
      <SmallPanel className="shadow"></SmallPanel>
      <div className="large-panel panel shadow">
        <div className="panel-bg">
          {/* <div className="control-button shadow"></div> */}
          <div className="control-strip-info-screen shadow">{children}</div>
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
