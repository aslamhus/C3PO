import React, { useId, useState } from "react";
import classNames from "classnames";
import "./input-group.scss";

export default function InputGroup({ children, ...props }) {
  const [inputFocusList, setInputFocusList] = useState({});

  const groupId = useId();

  const onFocus = (event) => {
    setInputFocusList({
      ...inputFocusList,
      [event.target.dataset.groupId]: true,
    });
  };
  const onBlur = (event) => {
    const list = { ...inputFocusList };
    if (list[event.target.dataset.groupId]) {
      delete list[event.target.dataset.groupId];
    }
    // console.log("blur", list, event.target.dataset.groupId);
    setInputFocusList(list);
  };
  const inputGroupClassName = classNames("input-group", props?.className, {
    "has-focus": Object.keys(inputFocusList).length,
  });

  const renderInputs = (children) => {
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        onFocus,
        onBlur,
        ["data-group-id"]: `${groupId}-${index}`,
      });
    });
  };

  return (
    <div className={inputGroupClassName} {...props}>
      <span></span>
      <div>{renderInputs(children)}</div>
      <span></span>
    </div>
  );
}
