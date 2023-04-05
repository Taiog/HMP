import React from "react";
import styles from "./EndGame.module.css";
import axios from "axios";

import { useContext } from "react";
import { GameContext } from "../../context/game";
import { useUser } from "../../context/UserContext";

const EndGame = () => {
  const [gameState, dispatch] = useContext(GameContext);
  const user = useUser();
  console.log(user);
  const playAgain = () => dispatch({ type: "NEW_GAME" });
  const finalScore = gameState.finalScore.reduce((acc, value) => acc + value);
  if (user) {
    const sendScore = async () => {
      await axios.put("http://localhost:3001/HMP/updateScore", {
        User_email: user.User_email,
        User_score: finalScore,
      });
    };
    sendScore();
  }
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
        <p>Final Score: {finalScore}</p>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default EndGame;
