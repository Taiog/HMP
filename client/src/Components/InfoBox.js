import ReactCountryFlag from "react-country-flag";
import styles from "./InfoBox.module.css";

function InfoBox({ city, country, countryCode }) {
  return (
    <div className={styles.infobox}>
      <div className={styles.info}>
        <div className={styles.flagCountry}>
          <ReactCountryFlag
            countryCode={countryCode}
            style={{ width: "2.5em", height: "2.5em" }}
            svg
          />
        </div>
        <div className={styles.city}>
          <p>City:</p>
          <div>{city}</div>
          <p>Country:</p>
          <div>{country}</div>
        </div>
      </div>
    </div>
  );
}

export default InfoBox;
