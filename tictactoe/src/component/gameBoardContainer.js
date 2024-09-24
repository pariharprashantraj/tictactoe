import React, { useState, useEffect } from "react";
import "../App.css";
import GameBoard from "./gameBoard";

const defaultState = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoardContainer() {
  const [userOne, setUserOne] = useState("Player 1");
  const [userTwo, setUserTwo] = useState("Player 2");
  const [editUserOne, setEditUserOne] = useState(false);
  const [editUserTwo, setEditUserTwo] = useState(false);
  const [game, setGame] = useState(defaultState);
  const [activePlayer, setActivePlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [stopGame, setStopGame] = useState(false);
  const [playerOneWon, setPlayerOneWon] = useState(0);
  const [playerTwoWon, setPlayerTwoWon] = useState(0);

  const handleNameOneChange = () => {
    setEditUserOne((cur) => !cur);
  };
  const handleNameTwoChange = () => {
    setEditUserTwo((cur) => !cur);
  };

  const editSaveIcon = (check, handleChange) => (
    <img
      src={check ? "/asset/save.png" : "/asset/edit.png"}
      height="20px"
      width="20px"
      onClick={handleChange}
    />
  );

  const changeUserName = (val, changeFun) => (
    <input
      type="text"
      vlaue={val}
      onChange={(e) => changeFun(e.target.value.toUpperCase())}
    />
  );

  const handleChangeActivePlayer = () => {
    activePlayer === "X" ? setActivePlayer("O") : setActivePlayer("X");
  };

  const playerWon = (player, con) => {
    console.log(con);
    if (player === "X") {
      setWinner(userOne);
      setPlayerOneWon((old) => old + 1);
    } else if (player === "O") {
      setWinner(userTwo);
      setPlayerTwoWon((old) => old + 1);
    }
    setStopGame(true);
  };

  const handleRestart = () => {
    setGame(defaultState);
    setWinner(null);
    setStopGame(false);
    setActivePlayer("X");
  };

  useEffect(() => {
    if (game[0][0] === game[0][1] && game[0][1] === game[0][2]) {
      if (game[0][0] != null) {
        playerWon(game[0][0], 0);
      }
    } else if (game[1][0] === game[1][1] && game[1][1] === game[1][2]) {
      if (game[1][0] != null) {
        playerWon(game[1][0], 1);
      }
    } else if (game[2][0] === game[2][1] && game[2][1] === game[2][2]) {
      if (game[2][0] != null) {
        playerWon(game[2][0], 2);
      }
    } else if (game[0][0] === game[1][0] && game[1][0] === game[2][0]) {
      if (game[0][0] != null) {
        playerWon(game[0][0], 3);
      }
    } else if (game[0][1] === game[1][1] && game[1][1] === game[2][1]) {
      if (game[0][1] != null) {
        playerWon(game[0][1], 4);
      }
    } else if (game[0][2] === game[1][2] && game[1][2] === game[2][2]) {
      if (game[0][2] != null) {
        playerWon(game[0][2], 5);
      }
    } else if (game[0][0] === game[1][1] && game[1][1] === game[2][2]) {
      if (game[0][0] != null) {
        playerWon(game[0][0], 6);
      }
    } else if (game[0][2] === game[1][1] && game[1][1] === game[2][0]) {
      if (game[0][2] != null) {
        playerWon(game[0][2], 7);
      }
    } else if (game.flat().every((cell) => cell !== null)) {
      if (!winner) {
        setWinner("Nobody");
      }
    }
  }, [game]);

  return (
    <div className="box">
      <div className="gameBoardContainer flex fc">
        <div className="playersInfo flex">
          <div
            className={`playerOne flex sa ${
              activePlayer === "X" ? "active" : ""
            }`}
          >
            <>
              {editUserOne ? (
                changeUserName(userOne, setUserOne)
              ) : (
                <div className="showUserName">
                  ({playerOneWon}){userOne}
                </div>
              )}
            </>
            {editSaveIcon(editUserOne, handleNameOneChange)}
          </div>
          <div
            className={`playerTwo flex sa ${
              activePlayer === "O" ? "active" : ""
            }`}
          >
            <>
              {editUserTwo ? (
                changeUserName(userTwo, setUserTwo)
              ) : (
                <div className="showUserName">
                  ({playerTwoWon}){userTwo}
                </div>
              )}
            </>
            {editSaveIcon(editUserTwo, handleNameTwoChange)}
          </div>
        </div>
        <div className="gamebox flex">
          <GameBoard
            game={game}
            setGame={setGame}
            activePlayer={activePlayer}
            changeActivePlayer={handleChangeActivePlayer}
            gamestopped={stopGame}
          />
        </div>
      </div>

      <>
        {winner ? (
          <div className="winnerStatus flex">
            <div className="flex">
              <div className="winnerName">{winner} </div>Won the Game.
            </div>
            <button className="btn" onClick={handleRestart}>
              Rematch
            </button>
          </div>
        ) : null}
      </>
    </div>
  );
}
