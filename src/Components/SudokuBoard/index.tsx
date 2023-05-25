import React from "react";
import { useState } from "react";
import './index.css';

function SudokuBoard() {
    return (
        <div className="sudoku-board">
            {Array.apply(0, Array(9)).map((x, i) => {
                return (
                    <div className="board-subsquare">
                        {Array.apply(0, Array(9)).map((x, i) => {
                            return (
                                <select className="board-item" name="sudoku-square" >
                                    <option value="" selected></option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
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