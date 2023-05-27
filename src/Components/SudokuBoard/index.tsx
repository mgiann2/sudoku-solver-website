import React from "react";
import './index.css';

function SudokuBoard(props: any) {
    function updateSquare(i: number, j: number, val: string)
    {
        let newBoard: string[][] = JSON.parse(JSON.stringify(props.board));
        newBoard[i][j] = val;
        console.log(newBoard);
        props.updateBoard(newBoard);
    }

    return (
        <div className="sudoku-board">
            {props.board.map((x: string[], i: number) => {
                return (
                    <div className="board-subsquare">
                        {x.map((val, j) => {
                            return (
                                <select className="board-item" name="sudoku-square" value={val} onChange={(e) => updateSquare(i, j, e.target.value)}>
                                    {["", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(d => (
                                        <option value={d} selected={val === d}>{d}</option>
                                    ))}
                                </select>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default SudokuBoard;