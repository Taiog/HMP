import { FaArrowRight } from "react-icons/fa";
import styles from "./GuessBox.module.css";
import { useContext, useState } from "react";
import { GameContext } from "../context/game";

function GuessBox() {
  const [gameState, dispatch] = useContext(GameContext);
  const resultRound = () => {
    dispatch({ type: "ROUND_STATE" });
    gameState.roundGuess = guess;
    let score = 0;
    if (gameState.roundGuess <= gameState.roundPop) {
      score =
        (1 -
          Math.abs(gameState.roundGuess - gameState.roundPop) /
            gameState.roundPop) *
        10000;
    } else if (
      gameState.roundGuess / 10 < gameState.roundPop &&
      gameState.roundGuess > gameState.roundPop
    ) {
      score =
        (1 -
          Math.abs(gameState.roundGuess - gameState.roundPop) /
            (gameState.roundPop * 9)) *
        1000;
    } else {
      score = 0;
    }
    gameState.roundScore = Math.trunc(Math.max(0, score));
    gameState.finalScore.push(gameState.roundScore);
  };
  const [guess, setGuess] = useState("");
  const userGuess = (data) => {
    setGuess(data);
  };
  return (
    <div className={styles.guessBox}>
      <div className={styles.guessForm}>
        <input
          type="text"
          placeholder="Your Guess"
          required
          value={Number.parseInt(guess)}
          onChange={(e) => userGuess(e.target.value)}
        ></input>
        <button onClick={resultRound}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default GuessBox;
