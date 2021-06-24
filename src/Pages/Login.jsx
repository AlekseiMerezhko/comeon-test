import React, { useState, memo } from "react";
import logo from "../images/logo.svg";
import { useSession } from "../hooks/withSession";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const session = useSession();
  const history = useHistory();
  const { setAuthenticated, setCurrentUser } = session;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSignIn = () => {
    fetch("http://localhost:3001/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(async (response) => response.json())
      .then((resp) => {
        const { status, player } = resp;
        if (status === "success") {
          setAuthenticated(true);
          setCurrentUser({ ...player, username: username });
          history.push("/casino");
        } else {
          setError(true);
        }
      })
      .catch((e) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <div className="ui one column center aligned page grid">
        <div className="column twelve wide">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="main container">
        <div className="login">
          <div className="ui grid centered">
            <form>
              <div className="fields">
                <div className="required field">
                  <div className="ui icon input">
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      name="username"
                      placeholder="Username"
                    />
                    <i className="user icon"></i>
                  </div>
                </div>

                <div className="required field">
                  <div className="ui icon input">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    <i className="lock icon"></i>
                  </div>
                </div>
                <span className="error-text">
                  {error && `Player does not exist or wrong password`}
                </span>
                <div className="field">
                  <div className="ui icon input">
                    <input
                      type="submit"
                      value="Login"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSignIn();
                      }}
                    />
                    <i className="right chevron icon"></i>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
