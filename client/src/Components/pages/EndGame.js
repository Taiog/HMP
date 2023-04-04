import React from "react";
import styles from "./EndGame.module.css";

import { useContext } from "react";
import { GameContext } from "../../context/game";

const EndGame = () => {
  const [gameState, dispatch] = useContext(GameContext);
  const playAgain = () => dispatch({ type: "NEW_GAME" });
  return (
    <div>
      <div className={styles.end}>
        <div>Game over</div>
        <div>
          <p>Resume match</p>
          <li>Round 1 - Score: {gameState.finalScore[0]} </li>
          <li>Round 2 - Score: {gameState.finalScore[1]} </li>
          <li>Round 3 - Score: {gameState.finalScore[2]} </li>
          <li>Round 4 - Score: {gameState.finalScore[3]} </li>
          <li>Round 5 - Score: {gameState.finalScore[4]} </li>
        </div>
        <p>Final Score: {gameState.finalScore}</p>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default EndGame;
