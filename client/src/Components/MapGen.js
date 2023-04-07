import { useEffect, useState } from "react";
import styles from "./MapGen.module.css";
import InfoBox from "./InfoBox";
import GuessBox from "./GuessBox";
import ScoreModal from "./ScoreModal";
import { useContext } from "react";
import { GameContext } from "../context/game";

function MapGen() {
  const [data, setData] = useState([]);
  const [gameState] = useContext(GameContext);

  useEffect(() => {
    fetch("http://localhost:3001/api/cities", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, [gameState.gameMap]);
  gameState.roundPop = data.population;
  return (
    <div className={styles.map}>
      <iframe
        title={data.id}
        frameBorder="0"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAPS_KEY}&q=${data.city},+${data.country}&maptype=satellite`}
        allowFullScreen
      ></iframe>
      <InfoBox
        city={`${data.city}`}
        country={`${data.country}`}
        countryCode={`${data.iso2}`}
      />
      <GuessBox />
      <ScoreModal />
    </div>
  );
}

export default MapGen;
