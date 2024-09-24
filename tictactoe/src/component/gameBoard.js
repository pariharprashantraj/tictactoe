import React, { useState } from "react";

export default function GameBoard({
  game,
  setGame,
  activePlayer,
  changeActivePlayer,
  gamestopped,
}) {
  const [gameValue, setGameValue] = useState("");
  const handleChange = (r, c) => {
    if (gamestopped) {
      return;
    }
    if (game[r][c] === null) {
      const temp = game.map((row) => [...row]);
      temp[r][c] = activePlayer;
      setGame(temp);
      changeActivePlayer();
    }
  };
  return (
    <div className="flexRow">
      {game.map((row, rowIndex) => {
        return (
          <div className="gameRow">
            {row.map((r, colIndex) => {
              return (
                <div
                  className="gameSquareBox flex"
                  onClick={() => handleChange(rowIndex, colIndex)}
                  key={rowIndex + colIndex}
                >
                  {game[rowIndex][colIndex]}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
