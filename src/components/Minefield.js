import React from "react";
import Cell from "./Cell";
import { useGame } from "./GameContext";
import "./Minefield.css";

 function Minefield() {
  const {
    cells,
    revealCell,
    flagCell,
  } = useGame();

  return (
    <div className="minefield">
      <table>
        <tbody>
          {cells.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, colIndex) => (
                <td key={`col-${colIndex}`}>
                  <Cell
                    key={`cell-${colIndex}`}
                    onClick={() => revealCell(rowIndex, colIndex)}
                    onRightClick={() => flagCell(rowIndex, colIndex)}
                    revealed={cell.revealed}
                    flagged={cell.flagged}
                    value={cell.value}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Minefield;
