import logo_img from "../Images/HMP_Logo_home.png";
import styles from "./Home.module.css";

import { useContext } from "react";
import { GameContext } from "../../context/game";

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [_, dispatch] = useContext(GameContext);
  const playGame = () => dispatch({ type: "CHANGE_STATE" });

  return (
    <div className={styles.body}>
      <img src={logo_img} alt="Welcome" className={styles.gameLogo}></img>

      <button className={styles.play} onClick={playGame}>
        Play Game
      </button>
    </div>
  );
}

export default Home;
