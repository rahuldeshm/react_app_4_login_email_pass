import React, { useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Input from "./Input";
import AuthContext from "../../store/auth-context";

const Login = (props) => {
  const ctx = useContext(AuthContext);

  const submitHandler = (a, b, c) => {
    ctx.onLogIn(a, b, c);
  };

  return (
    <Card className={classes.login}>
      <Input onSubmit={submitHandler}></Input>
    </Card>
  );
};

export default Login;
