import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Casino from "./Pages/Casino";
import Ingame from "./Pages/Ingame";

import PrivateRoute from "./Components/PrivateRoute";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/casino" component={Casino} />
        <PrivateRoute exact path="/ingame" component={Ingame} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
