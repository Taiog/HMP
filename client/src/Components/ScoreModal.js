import styles from "./ScoreModal.module.css";

import { useCallback, useContext, useEffect } from "react";
import { GameContext } from "../context/game";

function ScoreModal() {
  const [gameState, dispatch] = useContext(GameContext);
  const playAgain = useCallback(
    () => dispatch({ type: "NEXT_ROUND" }, (gameState.result = false)),
    [gameState, dispatch]
  );
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && gameState.result) {
        playAgain();
        // Do something when the Enter key is pressed
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameState, playAgain]);
  if (gameState.result) {
    return (
      <div className={styles.background}>
        <div className={styles.modal}>
          <div className={styles.title}>RESULT</div>
          <div className={styles.resumeBox}>
            <div className={styles.guess}>
              <span>Your Guess:</span>
              <p>{gameState.roundGuess}</p>
              <span>City Population:</span>
              <p>{gameState.roundPop}</p>
            </div>
            <div className={styles.score}>
              <span>Round Score</span>
              <p>{gameState.roundScore}</p>
            </div>
          </div>
          <button onClick={playAgain}>{gameState.roundMsg}</button>
        </div>
      </div>
    );
  }
}

export default ScoreModal;
