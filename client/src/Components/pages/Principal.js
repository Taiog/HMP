import React, { useContext } from "react";
import { GameContext } from "../../context/game";
import MapGen from "../MapGen";
import EndGame from "./EndGame";
import Home from "./Home";
import styles from "./Principal.module.css";

const Principal = () => {
  const [gameState] = useContext(GameContext);

  return (
    <div className={styles.contentWrapper}>
      {gameState.gameStage === "start" && <Home />}
      {gameState.gameStage === "playing" && <MapGen />}
      {gameState.gameStage === "end" && <EndGame />}
    </div>
  );
};

export default Principal;
