import { Typography } from "@mui/material";

import styles from "./Layouts.module.scss";

const Tittle = () => {
  return (
    <div className={styles.tittle}>
      <Typography variant="h1">Combate Naval</Typography>
    </div>
  );
};

export default Tittle;
