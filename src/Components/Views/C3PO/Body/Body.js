import React, { useState, useEffect, useRef } from "react";
import BodyPart from "./BodyPart";
import bodyParts from "./body-part-images.js";
import "./body.scss";
import "./movements.css";
import bodyPartImagesColor from "./body-part-images-color.js";
import classNames from "classnames";

const showBoundingBox = false;

const Body = React.forwardRef((props, ref) => {
  const { children, style, isSpeaking } = props;
  return (
    <div className="body-container" style={style}>
      {children}
      <div
        ref={ref}
        className={classNames("body", { "is-speaking": isSpeaking })}
      >
        <div className="head">
          <BodyPart
            className="head"
            src={bodyParts.head}
            color={bodyPartImagesColor.head}
          />
          <BodyPart
            className={"left-eye"}
            src={bodyParts.leftEye}
            color={bodyPartImagesColor.leftEye}
          >
            <BodyPart className="left-eyeball" src={bodyParts.leftEyeBall} />
          </BodyPart>
          <BodyPart
            className="right-eye"
            src={bodyParts.rightEye}
            color={bodyPartImagesColor.rightEye}
          >
            <BodyPart className="right-eyeball" src={bodyParts.rightEyeBall} />
          </BodyPart>
        </div>
        <div className="torso">
          <BodyPart
            className="torso"
            src={bodyParts.torso}
            color={bodyPartImagesColor.torso}
          />
          <div className="left-shoulder">
            <BodyPart
              className="left-shoulder-joint"
              src={bodyParts.leftShoulderJoint}
              color={bodyPartImagesColor.leftShoulderJoint}
            >
              <div className="left-arm">
                <BodyPart
                  className="left-main-arm"
                  src={bodyParts.leftMainArm}
                  color={bodyPartImagesColor.leftMainArm}
                >
                  <BodyPart
                    className="left-fore-arm"
                    src={bodyParts.leftForeArm}
                    color={bodyPartImagesColor.leftForeArm}
                  >
                    <BodyPart
                      className="left-hand"
                      src={bodyParts.leftHand}
                      color={bodyPartImagesColor.leftHand}
                    />
                  </BodyPart>
                </BodyPart>
              </div>
            </BodyPart>
          </div>
          <div className="right-shoulder">
            <BodyPart
              className="right-shoulder-joint"
              src={bodyParts.rightShoulderJoint}
              color={bodyPartImagesColor.rightShoulderJoint}
            >
              <div className="right-arm">
                <BodyPart
                  className="right-main-arm"
                  src={bodyParts.rightMainArm}
                  color={bodyPartImagesColor.rightMainArm}
                >
                  <BodyPart
                    className="right-fore-arm"
                    src={bodyParts.rightForeArm}
                    color={bodyPartImagesColor.rightForeArm}
                  >
                    <BodyPart
                      className="right-hand"
                      src={bodyParts.rightHand}
                      color={bodyPartImagesColor.rightHand}
                    />
                  </BodyPart>
                </BodyPart>
              </div>
            </BodyPart>
          </div>
          <BodyPart
            className="stomach"
            src={bodyParts.stomach}
            color={bodyPartImagesColor.stomach}
          />
        </div>

        <BodyPart
          className="hips"
          src={bodyParts.hips}
          color={bodyPartImagesColor.hips}
        >
          <BodyPart
            className="left-leg"
            src={bodyParts.leftLeg}
            color={bodyPartImagesColor.leftLeg}
          />
          <BodyPart
            className="right-leg"
            src={bodyParts.rightLeg}
            color={bodyPartImagesColor.rightLeg}
          />
        </BodyPart>
      </div>
    </div>
  );
});

export default Body;
