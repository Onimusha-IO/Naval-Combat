import { useState } from "react";

import Board from "../Board";

import styles from "./Game.module.scss";

const Game = () => {
  const [turn, setTurn] = useState(true);

  return (
    <div className={styles.game}>
      <Board playerName={"Jugador 1"} />
      <Board playerName={"Pc"} />
    </div>
  );
};

export default Game;
