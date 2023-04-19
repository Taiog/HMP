import styles from "./Loading.module.css";
import loader from "./Images/HMP_Logo.png";

function Loading() {
  return (
    <div className={styles.loaderContainer}>
      <img src={loader} alt="loader"></img>
    </div>
  );
}

export default Loading;
