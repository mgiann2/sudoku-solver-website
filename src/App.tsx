import React from 'react';
import { useState } from 'react';
import './App.css';
import SudokuBoard from './Components/SudokuBoard';
import { boardToCSP, CSPToBoard } from './Helpers/sudoku-board';

enum BoardStatus {
    Neutral = "white",
    Success = "hsl(120, 100%, 90%)",
    Fail = "hsl(0, 100%, 90%)",
};

function App() {
    let [board, updateBoard] = useState(new Array(9).fill(new Array(9).fill('')));
    let [boardStatus, updateBoardStatus] = useState(BoardStatus.Neutral);

    function clearBoard() {
        updateBoard(new Array(9).fill(new Array(9).fill('')));
        updateBoardStatus(BoardStatus.Neutral);
    }

    function solveBoard() {
        let sudokuCSP = boardToCSP(board);
        if(sudokuCSP.GACSolve()) {
            updateBoard(CSPToBoard(sudokuCSP));
            updateBoardStatus(BoardStatus.Success);
        } 
        else {
            updateBoardStatus(BoardStatus.Fail)
        }
    }

    return (
        <>
            <div className='content-div bg-lightbeige'>
                <h1>Sudoku Solver</h1>
            </div>
            <div className='content-div'>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quae blanditiis velit fugiat. Quibusdam natus sunt minima id rerum excepturi repellendus vel perspiciatis culpa? Magni praesentium neque saepe perferendis tenetur!</p>
            </div>
            <div className='bg-wood board-div'>
                <SudokuBoard board={board} updateBoard={updateBoard} statusColor={boardStatus}/>
                <div className='button-div'>
                    <button className='btn-solve' onClick={solveBoard}>Solve</button>
                    <button className='btn-clear' onClick={clearBoard}>Clear</button>
                </div>
            </div>
        </>
    );
}

export default App;
