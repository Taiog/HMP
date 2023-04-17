import { FaArrowRight } from "react-icons/fa";
import styles from "./GuessBox.module.css";
import { useContext, useState } from "react";
import { GameContext } from "../context/game";
import axios from "axios";

function GuessBox() {
  const [gameState, dispatch] = useContext(GameContext);

  const resultRound = async (e) => {
    e.preventDefault();
    await axios
      .get(`${process.env.REACT_APP_URL_API}/api/population`)
      .then((data) => {
        console.log(data.data);
        gameState.roundPop = data.data;
      })
      .catch((err) => console.log(err));
    dispatch({ type: "ROUND_STATE" });
    gameState.roundGuess = guess;
    let score = 0;
    score =
      (1 -
        Math.abs(gameState.roundGuess - gameState.roundPop) /
          gameState.roundPop) *
      10000;
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
