import React from "react";
import styles from "./EndGame.module.css";
import axios from "axios";

import { useContext } from "react";
import { GameContext } from "../../context/game";
import { useUser } from "../../context/UserContext";

const EndGame = () => {
  const [gameState, dispatch] = useContext(GameContext);
  const user = useUser();
  const playAgain = () => dispatch({ type: "NEW_GAME" });
  const finalScore = gameState.finalScore.reduce((acc, value) => acc + value);
  if (user) {
    const sendScore = async () => {
      await axios.put(`${process.env.REACT_APP_URL_API}/HMP/updateScore`, {
        User_email: user.User_email,
        User_score: finalScore,
      });
    };
    sendScore();
  }
  return (
    <div>
      <div className={styles.endBox}>
        <h1>Game over</h1>
        <div className={styles.resume}>
          <p>Resume match</p>
          <li>Round 1 - Score: {gameState.finalScore[0]} </li>
          <li>Round 2 - Score: {gameState.finalScore[1]} </li>
          <li>Round 3 - Score: {gameState.finalScore[2]} </li>
          <li>Round 4 - Score: {gameState.finalScore[3]} </li>
          <li>Round 5 - Score: {gameState.finalScore[4]} </li>
        </div>
        <p>Final Score: {finalScore}</p>
        <button onClick={playAgain}>Home</button>
      </div>
    </div>
  );
};

export default EndGame;
