import React from "react";
import { Input, InputLabel, Typography, Link, Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStyles, CenteredBox } from "../style/login";

interface IInput {
  email: string;
  password: string;
}

const Login: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, control } = useForm<IInput>();

  const onSubmit = (data: IInput) => console.log(data);

  return (
    <CenteredBox component="section">
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" className={classes.header}>
          Login
        </Typography>
        <InputLabel className={classes.label}>Email</InputLabel>
        <Controller
          as={Input}
          name="email"
          control={control}
          defaultValue=""
          className={classes.input}
          required
          type="email"
          placeholder="example@example.com"
          rules={{ required: true }}
        />
        <InputLabel className={classes.label}>Password</InputLabel>
        <Controller
          as={Input}
          name="password"
          control={control}
          defaultValue=""
          className={classes.input}
          required
          type="password"
          placeholder="example@example.com"
          rules={{ required: true }}
        />
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Log in
        </Button>
        <Link
          color="primary"
          variant="h6"
          className={classes.link}
          onClick={() => history.push("/register")}
        >
          Register now!
        </Link>
      </form>
    </CenteredBox>
  );
};

export default Login;
