import styles from "./App.module.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NavBar from "./Components/Layout/header/NavBar";
import LogoHmp from "./Components/Layout/header/LogoHmp";
import Title from "./Components/Layout/header/Title";
import Footer from "./Components/Layout/footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  console.log(process.env.REACT_APP_ID_OAUTH);
  return (
    <div className={styles.field}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_ID_OAUTH}>
        <header className={styles.header}>
          <LogoHmp />
          <div className={styles.googleNav}>
            <Footer />
          </div>
          <Title />
          <NavBar />
        </header>
        <Outlet />
        <footer className={styles.footerVis}>
          <Footer />
        </footer>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
