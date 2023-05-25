import React from 'react';
import './App.css';
import SudokuBoard from './Components/SudokuBoard';

function App() {
  return (
    <>
        <h1>Sudoku Solver</h1>
        <div className='bg-wood board-div'>
            <SudokuBoard />
        </div>
    </>
  );
}

export default App;
