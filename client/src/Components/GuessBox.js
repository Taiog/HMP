import { FaArrowRight } from "react-icons/fa";
import styles from "./GuessBox.module.css";
import { useContext, useState } from "react";
import { GameContext } from "../context/game";

function GuessBox() {
  const [gameState, dispatch] = useContext(GameContext);

  const resultRound = (e) => {
    e.preventDefault();
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
    setGuess("");
  };

  const [guess, setGuess] = useState("0");
  const userGuess = (data) => {
    let dataNumber = Number.parseInt(data);
    setGuess(dataNumber);
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setGuess("");
      return;
    }
    if (isNaN(parseInt(e.target.value))) {
      return;
    }
    userGuess(e.target.value);
  };

  return (
    <div className={styles.guessBox}>
      <form className={styles.guessForm} onSubmit={resultRound}>
        <input
          type="text"
          placeholder="Your Guess"
          required
          value={guess}
          onChange={handleChange}
        ></input>
        <button type="submit">
          <FaArrowRight />
        </button>
      </form>
    </div>
  );
}

export default GuessBox;
