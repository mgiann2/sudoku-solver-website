import React from 'react';
import { useState } from 'react';
import './App.css';
import SudokuBoard from './Components/SudokuBoard';

function App() {
    let [board, updateBoard] = useState(new Array(9).fill(new Array(9).fill('')));

    return (
        <>
            <div className='content-div bg-lightbeige'>
                <h1>Sudoku Solver</h1>
            </div>
            <div className='content-div'>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quae blanditiis velit fugiat. Quibusdam natus sunt minima id rerum excepturi repellendus vel perspiciatis culpa? Magni praesentium neque saepe perferendis tenetur!</p>
            </div>
            <div className='bg-wood board-div'>
                <SudokuBoard board={board} updateBoard={updateBoard}/>
            </div>
            <div className='button-div'>
                <button className='btn-solve'>Solve</button>
                <button className='btn-clear'>Clear</button>
            </div>
        </>
    );
}

export default App;
