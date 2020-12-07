import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Register} exact />
      </Switch>
    </Router>
  );
};

export default App;
