import React from 'react';
import { useState } from 'react';
import './App.css';
import SudokuBoard from './Components/SudokuBoard';

const board1 = [['', '', '', '', '', '9', '6', '', '8'],
                ['7', '', '', '', '', '', '', '4', ''],
                ['4', '', '6', '', '', '', '', '', '1'],
                ['3', '', '6', '', '9', '', '', '7', ''],
                ['2', '', '', '', '6', '', '', '', ''],
                ['', '8', '', '', '', '', '', '', '3'],
                ['', '', '', '', '3', '', '1', '', '4'],
                ['', '', '5', '', '', '', '', '7', ''],
                ['', '2', '', '', '', '', '', '', '8']]

const board2 = [['', '', '2', '5', '', '9', '', '3', '1'],
                ['', '3', '1', '', '', '7', '6', '', '9'],
                ['9', '', '', '6', '', '', '2', '', ''],
                ['4', '1', '5', '7', '6', '', '', '2', '8'],
                ['', '', '', '1', '8', '', '', '', ''],
                ['3', '7', '', '', '', '9', '5', '', ''],
                ['', '', '', '', '', '', '3', '9', '6'],
                ['7', '5', '', '', '', '6', '', '1', ''],
                ['1', '', '', '8', '3', '2', '', '4', '']]

const board3 = [['', '', '', '5', '', '', '2', '6', ''],
                ['1', '', '', '', '', '', '', '', ''],
                ['', '', '', '7', '', '6', '', '', '1'],
                ['3', '', '', '', '1', '', '6', '9', '4'],
                ['', '', '', '5', '', '7', '2', '3', ''],
                ['2', '4', '8', '', '', '', '1', '', '5'],
                ['', '3', '', '', '', '6', '', '', '8'],
                ['', '', '9', '7', '', '2', '', '', ''],
                ['6', '', '7', '', '', '', '', '9', '']]

const board4 = [['3', '', '', '7', '', '', '', '', ''],
                ['', '', '8', '5', '', '', '', '', ''],
                ['', '', '9', '', '2', '', '', '', ''],
                ['', '4', '6', '2', '', '', '', '', '3'],
                ['', '', '', '1', '', '', '8', '', ''],
                ['', '', '', '', '3', '', '4', '', ''],
                ['8', '', '', '', '', '', '6', '7', ''],
                ['', '', '7', '', '', '6', '', '', '9'],
                ['', '5', '', '', '4', '', '2', '', '']]

const board5 = [['4', '', '', '', '', '', '', '', ''],
                ['9', '', '1', '', '', '5', '', '', ''],
                ['', '', '', '', '7', '', '3', '', ''],
                ['', '', '8', '', '', '2', '', '', '7'],
                ['', '', '', '', '', '7', '5', '2', ''],
                ['4', '', '', '9', '', '', '', '8', ''],
                ['6', '', '', '', '', '', '2', '', '9'],
                ['', '4', '', '6', '1', '', '', '', ''],
                ['1', '', '2', '', '', '', '', '', '']]

const boards = [board1, board2, board3, board4, board5]

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

function getRandomBoard(): string[][] {
    return boards[Math.floor(Math.random() * boards.length)]
}

let currSolver: Worker = null;

function App() {
    let [board, updateBoard] = useState(getRandomBoard());
    let [boardStatus, updateBoardStatus] = useState(BoardStatus.Neutral);
    let [solverStatus, updateSolverStatus] = useState(SolverStatus.NotStarted);

    function clearBoard() {
        if(currSolver !== null) {
            currSolver.terminate();
        }
        updateBoard(new Array(9).fill(new Array(9).fill('')));
        updateBoardStatus(BoardStatus.Neutral);
        updateSolverStatus(SolverStatus.NotStarted);
    }

    function solveBoard() {
        let sudokuSolver = new Worker(new URL("./Helpers/solver.ts", import.meta.url));
        currSolver = sudokuSolver;
        sudokuSolver.postMessage(board);
        updateSolverStatus(SolverStatus.Working);
        
        sudokuSolver.onmessage = (e: MessageEvent) => {
            currSolver = null;
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
                return <><p>Fill out the Sudoku board and let the solver complete it</p></>;
            case SolverStatus.Working:
                return <><p>Solving</p> <span style={{margin: "1rem 0 0 0"}} className='loader'></span></>;
            case SolverStatus.Succeeded:
                return <><p>A solution has been found</p></>;
            case SolverStatus.Failed:
                return <><p>There is no possible solution</p></>;
        }
    }

    return (
        <>
            <div className='content-div bg-lightbeige'>
                <h1>Sudoku Solver</h1>
            </div>
            <div className='content-div'>
                <h3>Welcome to Sudoku Solver!</h3>
                <p>Click on the squares of Sudoku board below to input numbers. When you have inputted all the numbers, click the solve button to start computing a solution. To reset the board press the clear button.</p>
                <p><strong>NOTE:</strong> the time to solve a Sudoku board increases as less squares on the board are filled. For reference, solving a board with 20 filled squares takes roughly 15 seconds. This time may vary depending on your device. </p>
            </div>
            <div className='bg-wood board-div'>
                <SudokuBoard board={board} updateBoard={updateBoard} updateBoardStatus={updateBoardStatus} statusColor={boardStatus}/>
                <div className='button-div'>
                    <button className='btn-solve' onClick={solveBoard}>Solve</button>
                    <button className='btn-clear' onClick={clearBoard}>Clear</button>
                </div>
            </div>
            <div className='content-div'>
                {getSolverStatusMessage()}
            </div>
            <div className='content-div bg-lightbeige'>
                <h3>Check this project out on Github!</h3>
                <a style={{margin: "1.5rem 0 0 0"}} href='https://github.com/mgiann2/sudoku-solver-website' className='btn-github'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 30 30">
                        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                    </svg>
                </a>
            </div>
        </>
    );
}

export default App;
