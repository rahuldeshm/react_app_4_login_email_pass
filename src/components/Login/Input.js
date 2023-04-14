import React, { useReducer, useState, useEffect } from "react";
import Button from "../UI/Button/Button";
import classes from "./Login.module.css";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.isValid };
  }
  return { value: "", isValid: false };
};
const collegeReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 4 };
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.isValid };
  }
  return { value: "", isValid: false };
};
function Input(props) {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passState, dispatchPass] = useReducer(passReducer, {
    value: "",
    isValid: null,
  });
  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form valid");
      console.log(
        emailState.isValid && passState.isValid && collegeState.isValid
      );
      setFormIsValid(
        emailState.isValid && passState.isValid && collegeState.isValid
      );
    }, 500);
    return () => {
      console.log("clean up");
      clearTimeout(identifier);
    };
  }, [collegeState.isValid, emailState.isValid, passState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };
  const collegeChangeHandler = (event) => {
    dispatchCollege({ type: "USER_INPUT", val: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dispatchPass({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };
  const validateCollegeHandler = () => {
    dispatchCollege({ type: "INPUT_BLUR" });
  };
  const validatePasswordHandler = (e) => {
    dispatchPass({ type: "INPUT_BLUR" });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    props.onSubmit(emailState.value, collegeState.value, passState.value);
  };
  return (
    <form onSubmit={submitHandler}>
      <div
        className={`${classes.control} ${
          emailState.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
      </div>
      <div
        className={`${classes.control} ${
          collegeState.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="College">College Name</label>
        <input
          type="text"
          id="College"
          value={collegeState.value}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />
      </div>
      <div
        className={`${classes.control} ${
          passState.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={passState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
      </div>
      <div className={classes.actions}>
        <Button type="submit" className={classes.btn} disabled={!formIsValid}>
          Login
        </Button>
      </div>
    </form>
  );
}

export default Input;
