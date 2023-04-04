import styles from "./Footer.module.css";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../../context/UserContext";

function Footer() {
  const user = useUser();
  const verifyToken = localStorage.getItem("@HMP-app/userToken");
  const [logged, setLogged] = useState(verifyToken);
  const [player, setPlayer] = useState({});
  const createUser = async (playerInfo) => {
    const response = await axios.post("http://localhost:3001/HMP/user", {
      User_ID_google: playerInfo.sub,
      User_name: `${playerInfo.given_name} ${playerInfo.family_name}`,
      User_email: playerInfo.email,
      User_score: 0,
    });
    const userToken = response.data.token;
    localStorage.setItem("@HMP-app/userToken", userToken);
  };
  if (logged) {
    return (
      <div className={styles.footerLogged}>
        <div className={styles.image}>
          <img src={player.picture}></img>
        </div>
        <div>
          <div>{`${user.User_name}`}</div>
          <div>#142</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.footer}>
      <GoogleLogin
        shape="pill"
        size="medium"
        text="signin_with"
        onSuccess={(credentialResponse) => {
          let decoded = jwt_decode(credentialResponse.credential);
          setPlayer(decoded);
          createUser(decoded);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        auto_select
      />
    </div>
  );
}

export default Footer;
