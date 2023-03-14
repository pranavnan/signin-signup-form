import React from "react";
import classes from "../styles/InputComponent.module.css";

const InputComponent = (props) => {
  return (
    <div className={classes["input-component"]}>
      <label htmlFor={props.id}>{props.label}</label>

      <div className={classes["input-container"]}>
        {props.icon}
        <input
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};

export default InputComponent;
