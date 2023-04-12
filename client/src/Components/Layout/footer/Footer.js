import styles from "./Footer.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../context/UserContext";
import { MdLogout } from "react-icons/md";

function Footer() {
  const user = useUser();
  const verifyToken = localStorage.getItem("@HMP-app/userToken");
  const [rankPlace, setRankPlace] = useState([]);
  const logged = verifyToken;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}/leaderboard/ranking`)
      .then((data) => {
        setRankPlace(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post(
        `${process.env.REACT_APP_URL_API}/auth/google`,
        {
          code: code.code,
        }
      );
      let decoded = jwt_decode(tokens.data.id_token);
      createUser(decoded);

      console.log(tokens);
    },
    onError: (errorResponse) => console.log(errorResponse),
    flow: "auth-code",
  });

  const createUser = async (playerInfo) => {
    const response = await axios.post(
      `${process.env.REACT_APP_URL_API}/HMP/user`,
      {
        User_ID_google: playerInfo.sub,
        User_name: `${playerInfo.given_name} ${playerInfo.family_name}`,
        User_email: playerInfo.email,
        User_score: 0,
        User_picture: playerInfo.picture,
      }
    );
    const userToken = response.data.token;
    localStorage.setItem("@HMP-app/userToken", userToken);
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("@HMP-app/userToken");
    window.location.reload();
  };

  let userPlace = 0;
  if (logged && user) {
    rankPlace.forEach((e, index) => {
      if (e._id === user._id) {
        userPlace = index + 1;
      }
    });

    return (
      <div className={styles.footerLogged}>
        <div className={styles.image}>
          <img src={user.User_picture} alt="."></img>
        </div>
        <div>
          <div>{`${user.User_name}`}</div>
          <div>#{userPlace}</div>
        </div>
        <button onClick={logout} title="Logout">
          <MdLogout />
        </button>
      </div>
    );
  }

  return (
    <div className={styles.footer}>
      <button onClick={googleLogin}>login</button>
      {/* <GoogleLogin
        shape="pill"
        size="medium"
        text="signin_with"
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          let decoded = jwt_decode(credentialResponse.credential);
          createUser(decoded);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        auto_select
      /> */}
    </div>
  );
}

export default Footer;
