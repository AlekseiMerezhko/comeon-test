import React, { useContext, useState } from "react";

export const SessionContext = React.createContext({
  status: "",
  player: {},
});

export const { Consumer: SessionConsumer, Provider: SessionProvider } =
  SessionContext;

export function useSession() {
  return useContext(SessionContext);
}

export function withSession(WrappedComponent) {
  return function WithSession(props) {
    return (
      <SessionConsumer>
        {(session) => <WrappedComponent session={session} {...props} />}
      </SessionConsumer>
    );
  };
}

export const AppSession = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const cleanSession = () => {
    setAuthenticated(false);
    setCurrentUser({});
  };

  const session = {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    setAuthenticated,
    cleanSession,
  };

  return <SessionProvider value={session}>{children}</SessionProvider>;
};
