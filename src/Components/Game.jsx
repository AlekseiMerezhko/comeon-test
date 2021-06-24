import React, { memo } from "react";

const Game = ({ game: { code, icon, name, description }, handlePlay }) => {
  return (
    <div className="game item">
      <div className="ui small image">
        <img src={icon} alt="game-icon" />
      </div>
      <div className="content">
        <div className="header">
          <b className="name">{name}</b>
        </div>
        <div className="description">{description}</div>
        <div className="extra">
          <div
            className="play ui right floated secondary button inverted"
            onClick={() => handlePlay(code)}
          >
            Play
            <i className="right chevron icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Game);
