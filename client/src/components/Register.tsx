import { Typography, InputLabel, Input, Button, Link } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CenteredBox, useStyles } from "../style/login";

interface IInput {
  email: string;
  password: string;
  repeatPassword: string;
}

const Register: React.FC = () => {
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

        <InputLabel className={classes.label}>Repeat password</InputLabel>
        <Controller
          as={Input}
          name="repeatPassword"
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
          Register
        </Button>
        <Link
          color="primary"
          variant="h6"
          className={classes.link}
          onClick={() => history.push("/register")}
        >
          Already have an account? Sign in
        </Link>
      </form>
    </CenteredBox>
  );
};

export default Register;
