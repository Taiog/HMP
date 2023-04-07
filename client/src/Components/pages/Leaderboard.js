import styles from "./Leaderboard.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import first_img from "../Images/first.png";
import second_img from "../Images/second.png";
import third_img from "../Images/third.png";

function Leaderboard() {
  const [rank, setRank] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/leaderboard/ranking")
      .then((data) => {
        setRank(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className={styles.leaderBox}>
        <div className={styles.title}>Leaderboard</div>
        <div className={styles.ranking}>
          {rank.length > 0 &&
            rank.map((e, index) => {
              if (index === 0) {
                return (
                  <div key={e._id} className={styles.firstPlace}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img src={first_img} alt="."></img>
                      <img
                        src={e.User_picture}
                        alt="."
                        style={{ marginRight: "0.5em" }}
                      ></img>
                      <p>{e.User_name}</p>
                    </div>
                    <p>{e.User_score} pts</p>
                  </div>
                );
              }
              if (index === 1) {
                return (
                  <div key={e._id} className={styles.secondPlace}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img src={second_img} alt="."></img>
                      <img
                        src={e.User_picture}
                        alt="."
                        style={{ marginRight: "0.5em" }}
                      ></img>
                      <p>{e.User_name}</p>
                    </div>
                    <p>{e.User_score} pts</p>
                  </div>
                );
              }
              if (index === 2) {
                return (
                  <div key={e._id} className={styles.thirdPlace}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img src={third_img} alt="."></img>
                      <img
                        src={e.User_picture}
                        alt="."
                        style={{ marginRight: "0.5em" }}
                      ></img>
                      <p>{e.User_name}</p>
                    </div>
                    <p>{e.User_score} pts</p>
                  </div>
                );
              } else {
                return (
                  <div key={e._id} className={styles.place}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.2em",
                          width: "40px",
                          textAlign: "center",
                        }}
                      >
                        {index + 1 + "º"}
                      </div>
                      <img src={e.User_picture} alt="."></img>
                      <p>{e.User_name}</p>
                    </div>
                    <p>{e.User_score} pts</p>
                  </div>
                );
              }
            })}
        </div>
      </div>
      <a
        href="https://www.flaticon.com/br/icones-gratis/terceiro-lugar"
        title="terceiro lugar ícones"
        className={styles.iconRef}
        target="_blank"
        rel="noreferrer"
      >
        Ícones criados por Handicon - Flaticon
      </a>
    </>
  );
}

export default Leaderboard;
