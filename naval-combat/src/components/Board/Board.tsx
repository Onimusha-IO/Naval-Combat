import { useEffect, useState } from "react";

import { Alert, Autocomplete, Paper, TextField, Typography } from "@mui/material";
import { nanoid } from "nanoid";

import Coordinate from "../Coordinate";

import styles from "./Board.module.scss";

const Board = ({ playerName }: any) => {
  // user spcified placement point
  const [position, setPosition] = useState({});

  // boats
  const [fiveSpacesBoat, setfiveSpacesBoat] = useState([]);
  const [firstThreeSpaces, setfirstThreeSpaces] = useState([]);
  const [secondThreeSpacesBoat, setSecondThreeSpacesBoat] = useState([]);
  const [firstTwoSpacesBoat, setFirstTwoSpacesBoat] = useState([]);
  const [secondTwoSpacesBoat, setSecondTwoSpacesBoat] = useState([]);

  // boats spaces
  const [fiveSpaces, setFiveSpaces] = useState(1);
  const [threeSpaces, setThreeSpaces] = useState(2);
  const [twoSpaces, setTwoSpaces] = useState(2);

  // option selected
  const [boatToDeploy, setBoatToDeploy] = useState("");
  const [orientationToDeploy, setOrientationToDeploy] = useState("");

  // options to display
  const [options, setOptions] = useState<string[]>([
    `Barco de cinco casillas (${fiveSpaces})`,
    `Barco de tres casillas (${threeSpaces})`,
    `Barco de dos casillas (${twoSpaces})`,
  ]);

  // key to reset the combo box
  const [boatKey, setBoatKey] = useState(nanoid());
  const [orientationKey, setOrientationKey] = useState(nanoid());

  // error
  const [error, setError] = useState(false);

  const getOptions = () => {
    setOptions([
      `Barco de cinco casillas (${fiveSpaces})`,
      `Barco de tres casillas (${threeSpaces})`,
      `Barco de dos casillas (${twoSpaces})`,
    ]);
  };

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const deploy = (coordinate: any) => {
    console.log("coordinates: ", coordinate);

    if (boatToDeploy === "") {
      setError(true);
      return;
    }

    if (orientationToDeploy === "") {
      setError(true);
      return;
    }

    // board representation
    const board = letters.map((l: any) => {
      return numbers.map((n: any) => {
        return `${l}${n}`;
      });
    });

    console.log(board);
    // up exists
    if (orientationToDeploy.includes("V")) {
      const location = board
        .map((row: any) => {
          const point = `${coordinate.x}${coordinate.y}`;
          const result = row.find((col: any) => {
            return col === point;
          });

          return result;
        })
        .findIndex((def: any) => {
          return def !== undefined;
        });

      console.log("horizontal location: ", location);
      if (boatToDeploy.includes("cinco") && location + 1 - 5 >= 0) {
        console.log("Bote de cinco casillas puede ser colocado");
        setBoatKey(nanoid());
        setOrientationKey(nanoid());
        setBoatToDeploy("");
        setFiveSpaces(fiveSpaces - 1);
        getOptions();
      }

      if (boatToDeploy.includes("tres") && location + 1 - 3 >= 0) {
        console.log("Bote de tres casillas puede ser colocado");
        setBoatKey(nanoid());
        setOrientationKey(nanoid());
        setBoatToDeploy("");
        setThreeSpaces(threeSpaces - 1);
        getOptions();
      }

      if (boatToDeploy.includes("dos") && location + 1 - 2 >= 0) {
        console.log("Bote de dos casillas puede ser colocado");
        setBoatKey(nanoid());
        setOrientationKey(nanoid());
        setBoatToDeploy("");
        setTwoSpaces(twoSpaces - 1);
        getOptions();
      }
    }

    if (orientationToDeploy.includes("H")) {
      const point = `${coordinate.x}${coordinate.y}`;
      console.log("point: ", point);
      const location = board
        .map((row: any) => {
          return row
            .map((col: any) => {
              if (col === point) {
                return col;
              }
            })
            .findIndex((def: any) => {
              return def !== undefined;
            });
        })
        .filter((def: any) => {
          return def !== -1;
        });

      console.log("vertical location: ", location[0]);
      if (boatToDeploy.includes("cinco") && 5 - location[0] + 1 >= 0) {
        console.log("Bote de cinco casillas puede ser colocado");
        setBoatKey(nanoid());
        setOrientationKey(nanoid());
        setBoatToDeploy("");
        setFiveSpaces(fiveSpaces - 1);
        getOptions();
      }
      if (boatToDeploy.includes("tres") && 3 - location[0] + 1 >= 0) {
        console.log("Bote de tres casillas puede ser colocado");
        setBoatKey(nanoid());
        setOrientationKey(nanoid());
        setBoatToDeploy("");
        setThreeSpaces(threeSpaces - 1);
        getOptions();
      }

      if (boatToDeploy.includes("dos") && 2 - location[0] + 1 >= 0) {
        console.log("Bote de dos casillas puede ser colocado");
        setBoatKey(nanoid());
        setOrientationKey(nanoid());
        setBoatToDeploy("");
        setTwoSpaces(twoSpaces - 1);
        getOptions();
      }
    }
  };

  const columns = [" ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  useEffect(() => {
    getOptions();
  }, [boatToDeploy]);

  return (
    <div className={styles.board}>
      {error && (
        <Alert severity="error">
          {boatToDeploy === "" ? (
            <Typography>
              Debe seleccionar al menos un <strong>Barco</strong>
            </Typography>
          ) : (
            <Typography>
              Debe seleccionar al menos una <strong>Orientación</strong>
            </Typography>
          )}
        </Alert>
      )}
      <div className={styles.playerName}>
        <Typography variant="h3">{playerName}</Typography>
      </div>
      <div className={styles.selector}>
        <Autocomplete
          key={boatKey}
          disabled={
            fiveSpaces === 0 && threeSpaces === 0 && twoSpaces === 0 ? true : false
          }
          options={options}
          onChange={(event: any, newValue: any | null) => {
            setBoatToDeploy(newValue);
            setError(false);
          }}
          getOptionDisabled={(option: any) => {
            if (option.includes("cinco") && fiveSpaces === 0) {
              console.log(
                "disabled 5: ",
                option.includes("cinco") && fiveSpaces === 0
              );
              return true;
            }

            if (option.includes("tres") && threeSpaces === 0) {
              console.log(
                "disabled 3: ",
                option.includes("tres") && threeSpaces === 0
              );
              return true;
            }

            if (option.includes("dos") && twoSpaces === 0) {
              console.log("disabled 2: ", option.includes("dos") && twoSpaces === 0);
              return true;
            }

            return false;
          }}
          renderInput={(params) => (
            <TextField {...params} label="Selecciona un Barco" />
          )}
        />
      </div>
      <div className={styles.selector}>
        <Autocomplete
          key={orientationKey}
          disabled={
            fiveSpaces === 0 && threeSpaces === 0 && twoSpaces === 0 ? true : false
          }
          onChange={(event: any, newValue: any | null) => {
            setOrientationToDeploy(newValue);
            setError(false);
          }}
          options={["Horizontal", "Vertical"]}
          renderInput={(params) => (
            <TextField {...params} label="Selecciona una Orientación" />
          )}
        />
      </div>
      <Paper elevation={3}>
        <div className={styles.boardPanel}>
          <div className={styles.columnNames}>
            {columns.map((n: any) => {
              const key = nanoid();
              return (
                <div className={styles.column} key={key}>
                  <Typography>{n}</Typography>
                </div>
              );
            })}
          </div>
          {letters.map((l: any) => {
            const key = nanoid();
            return (
              <div className={styles.rows} key={key}>
                <div className={styles.rowNames}>
                  <Typography>{l}</Typography>
                </div>
                {numbers.map((n: any) => {
                  const key = nanoid();
                  return (
                    <Coordinate
                      point={{ x: l, y: n }}
                      key={key}
                      getPoint={setPosition}
                      deploy={deploy}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </Paper>
    </div>
  );
};

export default Board;
