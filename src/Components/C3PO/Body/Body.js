import React, { useState, useEffect, useRef } from 'react';
import BodyPart from './BodyPart';
import bodyParts from './body-part-images.js';
import './body.css';
import './movements.css';

const showBoundingBox = true;

const Body = React.forwardRef((props, ref) => {
  const { children, style } = props;
  return (
    <div className="body-container" style={style}>
      {children}
      <div ref={ref} className="body">
        <div className="head">
          <BodyPart className="head" src={bodyParts.head} />
          <BodyPart className="left-eye" src={bodyParts.leftEye}>
            <BodyPart className="left-eyeball" src={bodyParts.leftEyeBall} />
          </BodyPart>
          <BodyPart className="right-eye" src={bodyParts.rightEye}>
            <BodyPart className="right-eyeball" src={bodyParts.rightEyeBall} />
          </BodyPart>
        </div>
        <div className="torso">
          <BodyPart className="torso" src={bodyParts.torso} />
          <div className="left-shoulder">
            <BodyPart className="left-shoulder-joint" src={bodyParts.leftShoulderJoint}>
              <div className="left-arm">
                <BodyPart className="left-main-arm" src={bodyParts.leftMainArm}>
                  <BodyPart className="left-fore-arm" src={bodyParts.leftForeArm}>
                    <BodyPart className="left-hand" src={bodyParts.leftHand} />
                  </BodyPart>
                </BodyPart>
              </div>
            </BodyPart>
          </div>
          <div className="right-shoulder">
            <BodyPart className="right-shoulder-joint" src={bodyParts.rightShoulderJoint}>
              <div className="right-arm">
                <BodyPart className="right-main-arm" src={bodyParts.rightMainArm}>
                  <BodyPart className="right-fore-arm" src={bodyParts.rightForeArm}>
                    <BodyPart className="right-hand" src={bodyParts.rightHand} />
                  </BodyPart>
                </BodyPart>
              </div>
            </BodyPart>
          </div>
          <BodyPart className="stomach" src={bodyParts.stomach} />
        </div>

        <BodyPart className="hips" src={bodyParts.hips}>
          <BodyPart className="left-leg" src={bodyParts.leftLeg} />
          <BodyPart className="right-leg" src={bodyParts.rightLeg} />
        </BodyPart>
      </div>
    </div>
  );
});

export default Body;
