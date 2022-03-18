import { Tile } from "./Tile";

export const Row = ({ values, rowIndex, updateGrid }) => {
  return (
    <div className="Row">
      {values.map((tile, index) => {
        return (
          <Tile
            tileValue={tile}
            updateGrid={updateGrid}
            key={index.toString()}
            rowIndex={rowIndex}
            colIndex={index}
          />
        );
      })}
    </div>
  );
};
