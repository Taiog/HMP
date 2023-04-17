import { useEffect, useState, memo } from "react";
import styles from "./MapGen.module.css";
import InfoBox from "./InfoBox";
import GuessBox from "./GuessBox";
import ScoreModal from "./ScoreModal";
import Loading from "./Loading";
import { useContext } from "react";
import { GameContext } from "../context/game";
import axios from "axios";

function MapGen() {
  const [loading, setLoading] = useState(false);
  const [gameState] = useContext(GameContext);
  console.log(gameState.city);

  useEffect(() => {
    if (gameState.city) {
      console.log(gameState.data);
      setLoading(true);
    } else {
      axios
        .get(`${process.env.REACT_APP_URL_API}/api/cities`)
        .then((data) => {
          // console.log(data.data);
          if (!gameState.city) {
            gameState.data = data.data;
            console.log(gameState.data);
            setTimeout(() => {
              setLoading(true);
            }, 2000);
            gameState.city = true;
          }
        })
        .catch((err) => console.log(err));
    }
  }, [gameState.gameMap, gameState.city]);

  return (
    <div className={styles.map}>
      {!loading && <Loading />}
      <iframe
        title={gameState.data.id}
        frameBorder="0"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAPS_KEY}&q=${gameState.data.city},+${gameState.data.country}&maptype=satellite`}
        allowFullScreen
      ></iframe>
      <InfoBox
        city={`${gameState.data.city}`}
        country={`${gameState.data.country}`}
        countryCode={`${gameState.data.iso2}`}
      />
      <GuessBox />
      <ScoreModal />
    </div>
  );
}

export default MapGen;
