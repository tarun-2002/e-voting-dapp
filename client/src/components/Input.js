import React, { useContext } from "react";

import "./Input.css";

const Input = (props) => {
  return (
    <div className="input">
      <p>{props.title}</p>
      {props.inputType === "text"&& (
      <div className="input_box">
        <input
          type="text"
          className="input_box_form"
          placeholder={props.placeholder}
          onChange={props.handleClick}
        />
      </div>
      )}
    </div>
  );
};

export default Input;

