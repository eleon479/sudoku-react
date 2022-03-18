import { useState } from "react";

export const Tile = ({ tileValue, updateGrid, rowIndex, colIndex }) => {
  const [currentValue, setCurrentValue] = useState(tileValue);

  function updateValue(e) {
    e.preventDefault();
    let reg = new RegExp("^[1-9]*$");

    if (reg.test(e.key)) {
      const newValue = +e.key;
      setCurrentValue(newValue);
      updateGrid(rowIndex, colIndex, newValue);
    } else if (e.key === "Backspace") {
      setCurrentValue(0);
      updateGrid(rowIndex, colIndex, 0);
    }
  }

  return (
    <>
      <input
        className={`
          Tile
          ${rowIndex % 3 === 0 ? "top-border" : ""}
          ${rowIndex === 8 ? "bottom-border" : ""}
          ${colIndex % 3 === 0 ? "left-border" : ""}
          ${colIndex === 8 ? "right-border" : ""}
          ${rowIndex === 0 && colIndex === 0 ? "top-left" : ""}
          ${rowIndex === 0 && colIndex === 8 ? "top-right" : ""}
          ${rowIndex === 8 && colIndex === 0 ? "bottom-left" : ""}
          ${rowIndex === 8 && colIndex === 8 ? "bottom-right" : ""}
        `}
        value={currentValue ? currentValue : ""}
        onChange={(e) => updateValue(e.target.value)}
        onKeyDown={(e) => updateValue(e)}
      />
    </>
  );
};
