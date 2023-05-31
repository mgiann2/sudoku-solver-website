import React from 'react';
import { useState } from 'react';
import './App.css';
import SudokuBoard from './Components/SudokuBoard';

export enum BoardStatus {
    Neutral = "white",
    Success = "hsl(120, 100%, 90%)",
    Fail = "hsl(0, 100%, 90%)",
};

enum SolverStatus {
    NotStarted,
    Working,
    Succeeded,
    Failed
}

function App() {
    let [board, updateBoard] = useState(new Array(9).fill(new Array(9).fill('')));
    let [boardStatus, updateBoardStatus] = useState(BoardStatus.Neutral);
    let [solverStatus, updateSolverStatus] = useState(SolverStatus.NotStarted);

    function clearBoard() {
        updateBoard(new Array(9).fill(new Array(9).fill('')));
        updateBoardStatus(BoardStatus.Neutral);
        updateSolverStatus(SolverStatus.NotStarted);
    }

    function solveBoard() {
        let sudokuSolver = new Worker(new URL("./Helpers/solver.ts", import.meta.url));
        console.log(board)
        sudokuSolver.postMessage(board);
        updateSolverStatus(SolverStatus.Working);
        
        sudokuSolver.onmessage = (e: MessageEvent) => {
            if(e.data !== null) {
                updateBoard(e.data);
                updateBoardStatus(BoardStatus.Success);
                updateSolverStatus(SolverStatus.Succeeded);
            } 
            else {
                updateBoardStatus(BoardStatus.Fail);
                updateSolverStatus(SolverStatus.Failed);
            }
        }
    }

    function getSolverStatusMessage() {
        switch(solverStatus) {
            case SolverStatus.NotStarted:
                return "Fill out the Sudoku board and let the solver complete it!";
            case SolverStatus.Working:
                return "Solving the current Sudoku board. This may take some time.";
            case SolverStatus.Succeeded:
                return "A solution has been found!";
            case SolverStatus.Failed:
                return "There is no possible solution.";
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
                <SudokuBoard board={board} updateBoard={updateBoard} updateBoardStatus={updateBoardStatus} statusColor={boardStatus}/>
                <div className='button-div'>
                    <button className='btn-solve' onClick={solveBoard}>Solve</button>
                    <button className='btn-clear' onClick={clearBoard}>Clear</button>
                </div>
            </div>
            <div className='content-div'>
                <p>{getSolverStatusMessage()}</p>
            </div>
        </>
    );
}

export default App;
