import React, { useEffect, memo } from "react";
import { useLocation, useHistory } from "react-router-dom";
import logo from "../images/logo.svg";
const Ingame = () => {
  const location = useLocation();
  const history = useHistory();
  const {
    state: { code },
  } = location;
  useEffect(() => {
    window.comeon.game.launch(code);
  }, [code]);

  const handleBack = () => {
    history.push("/casino");
  };

  return (
    <div>
      <div className="ui one column center aligned page grid">
        <div className="column twelve wide">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="ingame">
        <div className="ui grid centered">
          <div className="three wide column">
            <div
              className="ui right floated secondary button inverted"
              onClick={handleBack}
            >
              <i className="left chevron icon"></i>Back
            </div>
          </div>
          <div className="ten wide column">
            <div id="game-launch"></div>
          </div>
          <div className="three wide column"></div>
        </div>
      </div>
    </div>
  );
};

export default memo(Ingame);
