import React, { memo } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSession } from "../hooks/withSession";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const session = useSession();
  const { isAuthenticated } = session;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect exact to="/" />
      }
    />
  );
};
export default memo(PrivateRoute);
