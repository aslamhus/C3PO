import React from "react";
import "./control-strip-group.css";

export default function ControlStripGroup({ className, children, ...props }) {
  const { padding, ...style } = props?.style || {};
  return (
    <div className="control-strip-group " style={style}>
      <SmallPanel className="shadow"></SmallPanel>
      <div className="large-panel panel shadow">
        <div className="panel-bg">
          {/* <div className="control-button shadow"></div> */}
          <div
            className="control-strip-info-screen shadow"
            style={{
              padding,
            }}
          >
            {children}
          </div>
        </div>
      </div>
      <SmallPanel className="shadow"></SmallPanel>
    </div>
  );
}

const SmallPanel = ({ style, className }) => {
  return (
    <div
      className={`small-panel panel${className ? ` ${className}` : ""}`}
      style={style}
    >
      <div className="panel-bg">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
