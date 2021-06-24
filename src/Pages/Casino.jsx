import React, { useState, useEffect, useCallback, memo } from "react";
import logo from "../images/logo.svg";
import { useSession } from "../hooks/withSession";
import { useHistory } from "react-router-dom";

import Game from "../Components/Game";
import Category from "../Components/Category";

const Casino = () => {
  const session = useSession();
  const history = useHistory();
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchGame, setSearchGame] = useState("");
  const [categoriesFilter, setCategoriesFilter] = useState([]);

  const handleFilterCategories = (id) => {
    const categoryExist = categoriesFilter.findIndex(
      (category) => category === id
    );
    if (categoryExist < 0) {
      const newCategoriesFilter = [...categoriesFilter, id];
      setCategoriesFilter(newCategoriesFilter);
    } else {
      const newCategoriesFilter = categoriesFilter.filter(
        (categoryId) => categoryId !== id
      );
      setCategoriesFilter(newCategoriesFilter);
    }
  };

  const {
    currentUser: { avatar, name, event, username },
    cleanSession,
  } = session;

  useEffect(() => {
    fetch("http://localhost:3001/games", { method: "get" })
      .then((response) => response.json())
      .then((resp) => {
        setGames(resp);
      });

    fetch("http://localhost:3001/categories", { method: "get" })
      .then((response) => response.json())
      .then((resp) => {
        setCategories(resp);
      });
  }, []);

  const handleLogOut = () => {
    fetch("http://localhost:3001/logout", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        cleanSession();
      })
      .then(() => {
        history.push("/casino");
      });
  };

  const handlePlay = useCallback(
    (code) => {
      history.push("/ingame", {
        code,
      });
    },
    [history]
  );

  return (
    <div>
      <div className="ui one column center aligned page grid">
        <div className="column twelve wide">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="main container">
        <div className="casino">
          <div className="ui grid centered">
            <div className="twelve wide column">
              <div className="ui list">
                <div className="player item">
                  <img className="ui avatar image" src={avatar} alt="avatar" />
                  <div className="content">
                    <div className="header">
                      <b className="name">{name}</b>
                    </div>
                    <div className="description event">{event}</div>
                  </div>
                </div>
              </div>
              <div
                className="logout ui left floated secondary button inverted"
                onClick={handleLogOut}
              >
                <i className="left chevron icon"></i>Log Out
              </div>
            </div>
            <div className="four wide column">
              <div className="search ui small icon input ">
                <input
                  type="text"
                  placeholder="Search Game"
                  value={searchGame}
                  onChange={(e) => setSearchGame(e.target.value)}
                />
                <i className="search icon"></i>
              </div>
            </div>
          </div>
          <div className="ui grid">
            <div className="twelve wide column">
              <h3 className="ui dividing header">Games</h3>

              <div className="ui relaxed divided game items links">
                {games
                  .filter((game) => {
                    const gameFilteredById = categoriesFilter.length
                      ? categoriesFilter.some((categoryId) =>
                          game.categoryIds.includes(categoryId)
                        )
                      : true;
                    return (
                      game.name
                        .toLowerCase()
                        .includes(searchGame.toLowerCase()) && gameFilteredById
                    );
                  })
                  .map((game) => {
                    return (
                      <Game
                        game={game}
                        handlePlay={handlePlay}
                        key={game.code}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="four wide column">
              <h3 className="ui dividing header">Categories</h3>

              <div className="ui selection animated list category items">
                {categories.map((category) => {
                  return (
                    <Category
                      category={category}
                      categoriesFilter={categoriesFilter}
                      handleFilterCategories={handleFilterCategories}
                      key={category.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Casino);
