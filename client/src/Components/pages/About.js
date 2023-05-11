import styles from "./About.module.css";
import javaScript from "../Images/javaScript.png";
import css from "../Images/CSS.png";
import react from "../Images/reactJS.png";
import node from "../Images/nodeJs.png";
import mongo from "../Images/MongoDB.jpg";
import mongoose from "../Images/mongoose.png";

function About() {
  return (
    <div className={styles.aboutBox}>
      <h1>Quem sou?</h1>
      <h3>
        Antes de apresentar o How Many People, preciso me apresentar, me chamo
        Tiago Guerra, estou estudando desenvolvimento Fullstack e este é meu
        primeiro projeto. Tenho 25 anos, brasileiro, residente em Aracaju-SE,
        sou formado em engenharia civil, porém, a cerca de 6 meses decidi migrar
        profissionalmente para área de desenvolvimento.
        <br />
        No momento estou em busca da primeira oportunidade de trabalho, e esse
        projeto será importante para minha entrada no mercado como dev. Espero
        que goste!
      </h3>
      <h1>O que é o How Many People?</h1>
      <h3>
        Este jogo é meu primeiro projeto como desenvolvedor, então busquei
        utilizar nele os conhecimentos que venho adquirindo nesses meses de
        estudo. As linguagens, tecnologias e banco de dados utilizadas foram:
      </h3>
      <div className={styles.icons}>
        <img src={javaScript} alt="." title="JavaScript"></img>
        <img src={css} alt="." title="CSS"></img>
        <img src={react} alt="." title="ReactJs"></img>
        <img src={node} alt="." title="NodeJs"></img>
        <img src={mongo} alt="." title="MongoDB"></img>
        <img src={mongoose} alt="." title="Mongoose"></img>
      </div>
      <h3>
        O jogo é bem simples, em uma partida de 5 rodadas, em cada rodada será
        apresentado uma cidade aleatória de um país aleatório, sua missão é
        advinhar qual a população daquela cidade, quanto mais perto chegar, mais
        pontos são acumulados, tente chegar ao topo do leaderboard e ganhe minha
        admiração. Boa diversão!
      </h3>
    </div>
  );
}

export default About;
