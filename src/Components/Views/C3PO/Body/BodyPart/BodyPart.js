import React from "react";
import "./body-part.scss";

export default function BodyPart({
  src,
  style,
  color,
  className,
  children,
  showBoundingBox,
}) {
  const getStyle = () => {
    if (showBoundingBox) {
      return {
        ...style,
        backgroundColor: "rgba(0,0,200,0.5)",
        border: "1px solid blue",
      };
    }
    return style;
  };

  return (
    <div style={{ ...getStyle() }} className={`${className} body-part`}>
      {src && <img src={src} />}
      {color && (
        <figure className="color">
          <img src={color} />
        </figure>
      )}
      {children}
    </div>
  );
}
