import { Link } from "react-router-dom";
import logo_img from "../../Images/HMP_Logo.png";
import styles from "./LogoHmp.module.css";

function LogoHmp() {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <img src={logo_img} alt="logo"></img>
      </Link>
    </div>
  );
}

export default LogoHmp;
