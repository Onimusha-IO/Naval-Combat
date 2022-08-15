import { useEffect, useState } from "react";
import styles from "./Coordinate.module.scss";

const Coordinate = ({ point, getPoint, deploy }: any) => {
  const [abscissa, setAbscissa] = useState("");
  const [ordinate, setOrdinate] = useState("");

  useEffect(() => {
    setAbscissa(point.x);
    setOrdinate(point.y);
  }, []);

  return (
    <div
      className={styles.coordinate}
      onClick={() => {
        console.log(`${abscissa}${ordinate}`);
        getPoint({ x: abscissa, y: ordinate });
        deploy({ x: abscissa, y: ordinate });
      }}
    ></div>
  );
};

export default Coordinate;
