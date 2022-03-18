import "./styles.css";
import { useState } from "react";

const solvedMap = [
  [4, 1, 7, 3, 6, 9, 8, 2, 5],
  [6, 3, 2, 1, 5, 8, 9, 4, 7],
  [9, 5, 8, 7, 2, 4, 3, 1, 6],
  [8, 2, 5, 4, 3, 7, 1, 6, 9],
  [7, 9, 1, 5, 8, 6, 4, 3, 2],
  [3, 4, 6, 9, 1, 2, 7, 5, 8],
  [2, 8, 9, 6, 4, 3, 5, 7, 1],
  [5, 7, 3, 2, 9, 1, 6, 8, 4],
  [1, 6, 4, 8, 7, 5, 2, 9, 3]
];

const startMap = [
  [4, 0, 0, 0, 0, 0, 8, 0, 5],
  [0, 3, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 7, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 0, 6, 0],
  [0, 0, 0, 0, 8, 0, 4, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 6, 0, 3, 0, 7, 0],
  [5, 0, 0, 2, 0, 0, 0, 0, 0],
  [1, 0, 4, 0, 0, 0, 0, 0, 0]
];

function App() {
  const [tiles, setTiles] = useState(startMap);

  const Tile = ({ tileValue }) => {
    const [changed, setChanged] = useState(false);
    const [currentValue, setCurrentValue] = useState(tileValue);

    function checkValidKey(e) {
      let numVal = Number(e.key);
      if (isNaN(numVal) || numVal < 1) {
        e.preventDefault();
      }
      console.log(e);
    }

    function updateValue(e) {
      e.preventDefault();
      let reg = new RegExp("^[1-9]*$");

      if (reg.test(e.key)) {
        setCurrentValue(e.key);
      } else if (e.key === "Backspace") {
        setCurrentValue(0);
      }
    }

    return (
      <>
        <input
          className="Tile"
          type="text"
          pattern="[1-9]"
          value={currentValue ? currentValue : ""}
          onChange={(e) => updateValue(e.target.value)}
          onKeyDown={(e) => updateValue(e)}
        />
      </>
    );
  };

  const Row = ({ values }) => {
    return (
      <div className="Row">
        {values.map((tile) => {
          return <Tile tileValue={tile} />;
        })}
      </div>
    );
  };

  return (
    <div className="App">
      <div className="Grid">
        {tiles.map((row) => {
          return <Row values={row} />;
        })}
      </div>
    </div>
  );
}

export default App;
