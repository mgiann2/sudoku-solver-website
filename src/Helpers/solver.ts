import { boardToCSP, CSPToBoard } from './sudoku-board';

onmessage = (e: MessageEvent) => {
    let board = e.data;
    let sudokuCSP = boardToCSP(board);
    if(sudokuCSP.GACSolve()) {
        postMessage(CSPToBoard(sudokuCSP));
    } 
    else {
        postMessage(null);
    }
}

export {}