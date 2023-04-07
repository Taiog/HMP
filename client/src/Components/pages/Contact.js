import styles from "./Contact.module.css";
import fotoPerfil from "../Images/foto_perfil_2.jpg";
import gitHub from "../Images/GitHub.jpg";
import linkedIn from "../Images/LinkedIn.png";

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
        <a href="https://github.com/Taiog" target="_blank" rel="noreferrer">
          <img src={gitHub} alt="."></img>
        </a>
        <a
          href="https://www.linkedin.com/in/tiago-guerra-851b141b6/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedIn} alt="."></img>
        </a>
      </div>
    </div>
  );
}

export default Contact;
