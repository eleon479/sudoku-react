import { useEffect, useState } from "react";
import { Row } from "./Row";
import "./styles.css";

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

const startMapObj = {
  grid: startMap,
  lastMove: {
    row: -1,
    col: -1,
    value: 0
  }
};

export default function App() {
  const [tiles, setTiles] = useState({ grid: [], lastMove: {} });
  const [emptyCount, setEmptyCount] = useState();

  useEffect(() => {
    setEmptyCount(countEmptyTiles(startMapObj.grid));
    setTiles(startMapObj);
  }, []);

  function countEmptyTiles(grid) {
    let empty = 0;
    grid.forEach((row) => {
      empty += row.filter((v) => v === 0).length;
    });

    return empty;
  }

  useEffect(() => {
    console.log("Tile grid updated, new values: ");
    // console.table(tiles.grid);
    console.log(tiles.lastMove);
  }, [tiles]);

  useEffect(() => {
    console.log("Empty count: ", emptyCount);
  }, [emptyCount]);

  function calculateEmptyCountChange(row, column, value) {
    let emptyChange = 0;
    if (value === tiles.grid[row][column]) {
      return;
    } else if (tiles.grid[row][column] === 0) {
      emptyChange = -1;
    } else if (value === 0) {
      emptyChange = +1;
    } else {
      emptyChange = 0;
    }
    return emptyChange;
  }

  function updateGrid(row, column, value) {
    console.log(`Updating grid - tile [${row}][${column}] - ${value}`);
    let newEmptyCount =
      emptyCount + calculateEmptyCountChange(row, column, value);
    let newTileGrid = tiles.grid;
    newTileGrid[row][column] = value;

    setEmptyCount(newEmptyCount);
    setTiles({
      grid: newTileGrid,
      lastMove: {
        row: row,
        col: column,
        value: value
      }
    });

    if (newEmptyCount === 0) {
      console.log("Game Over - Checking the board...");
      if (checkBoard(newTileGrid)) {
        alert("You win! gg");
      } else {
        alert("You lose!! Better luck next time.");
      }
    }
  }

  function checkBoard(finalGrid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (tiles.grid[row][col] !== solvedMap[row][col]) {
          return false;
        }
      }
    }

    return true;
  }

  return (
    <div className="App">
      <div className="Grid">
        {tiles.grid.map((row, index) => {
          return (
            <Row
              values={row}
              updateGrid={updateGrid}
              key={index.toString()}
              rowIndex={index}
            />
          );
        })}
      </div>
    </div>
  );
}
