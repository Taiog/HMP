import React from "react";
import { useContext } from "react";
import { GameContext } from "../../context/game";
import MapGen from "../MapGen";
import EndGame from "./EndGame";
import Home from "./Home";

const Principal = () => {
  const [gameState] = useContext(GameContext);

  return (
    <>
      {gameState.gameStage === "start" && <Home />}
      {gameState.gameStage === "playing" && <MapGen />}
      {gameState.gameStage === "end" && <EndGame />}
    </>
  );
};

export default Principal;
