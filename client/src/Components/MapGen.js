import { useEffect } from "react";
import styles from "./MapGen.module.css";
import InfoBox from "./InfoBox";
import GuessBox from "./GuessBox";
import ScoreModal from "./ScoreModal";
import Loading from "./Loading";
import { useContext } from "react";
import { GameContext } from "../context/game";
import axios from "axios";

function MapGen() {
  const [gameState, dispatch] = useContext(GameContext);

  useEffect(() => {
    if (!gameState.city) {
      axios
        .get(`${process.env.REACT_APP_URL_API}/api/cities`)
        .then((data) => {
          dispatch({ type: "CHANGE_CITY", payload: data.data });
          gameState.city = true;
        })
        .catch((err) => console.log(err));
    }
  });

  if (!gameState.city) {
    return <Loading />;
  }
  return (
    <div className={styles.map}>
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
