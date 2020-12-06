import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useUserStateContext } from "../context-api/UserContext";

const ProtectedRoute: React.FC<RouteProps> = ({
  component,
  path,
  exact,
  ...rest
}): JSX.Element => {
  const { isAuth } = useUserStateContext();

  return isAuth ? (
    <Route path={path} exact={exact} component={component} {...rest} />
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
