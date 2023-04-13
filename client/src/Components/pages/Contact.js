import styles from "./Contact.module.css";
import fotoPerfil from "../Images/foto_perfil_2.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Contact() {
  return (
    <div className={styles.contactBox}>
      <div className={styles.profile}>
        <img src={fotoPerfil} alt="."></img>
        <div>Tiago Guerra</div>
        <div style={{ fontSize: "small" }}>Fullstack developer</div>
      </div>
      <div className={styles.text}>Contato:</div>
      <p>tiagoargollo@hotmail.com</p>
      <div className={styles.images}>
        <a
          href="https://github.com/Taiog"
          target="_blank"
          rel="noreferrer"
          className={styles.github}
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/tiago-guerra-dev/"
          target="_blank"
          rel="noreferrer"
          className={styles.linkedin}
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}

export default Contact;
