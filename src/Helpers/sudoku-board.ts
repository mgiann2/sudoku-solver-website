import { Variable, Constraint, CSP } from "./csp-utils";

const domain = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function allDiff(vars: Variable[]): boolean {
    for(let i = 0; i < vars.length; i++) {
        for(let j = 0; j < vars.length; j++) {
            if(i !== j && vars[i].assigned_val === vars[j].assigned_val) {
                return false
            }
        }
    }
    return true
}

/**
 * Converts a board to a CSP object.
 * @param board the board to be turned into a CSP. A board is a 9x9 string array
 * that only contains the values: "", "1" , "2", "3", "4", "5", "6", "7", "8", "9".
 * Each row represents a 3x3 subsquare where the first row represents the top-left 
 * subsquare and the last row represents the bottom-right subsquare. Similarly, each column
 * represents the square within a subsquare where the first column is the top-left square and
 * the last column represents the bottom-left square.
 * @returns a CSP representation of the board
 */
export function boardToCSP(board: string[][]): CSP {
    // create variables row by row
    let variables = [];
    for(let row = 0; row < 9; row++) {
        for(let col = 0; col < 9; col++) {
            let subsquare = Math.floor(row / 3) * 3 + Math.floor(col/3);
            let square = Math.floor(row % 3) * 3 + (col % 3);
            let newVar = new Variable(`V${col}${row}`, domain);
            newVar.setConstant(board[subsquare][square]);
            variables.push(newVar);
        }
    }

    let constraints = [];
    // create row costraints
    for(let row = 0; row < 9; row++) {
        let scope = []
        for(let col = 0; col < 9; col++) {
            scope.push(variables[row*9 + col]);
        }
        constraints.push(new Constraint(`R${row}`, scope, allDiff))
    }

    // create column constraints
    for(let col = 0; col < 9; col++) {
        let scope = []
        for(let row = 0; row < 9; row++) {
            scope.push(variables[row*9 + col]);
        }
        constraints.push(new Constraint(`C${col}`, scope, allDiff))
    }

    // create subsquare constraints
    for(let subsquare = 0; subsquare < 9; subsquare++) {
        let scope = []
        for(let square = 0; square < 9; square++) {
            let row = Math.floor(subsquare / 3) * 3 + Math.floor(square / 3);
            let col = (subsquare % 3) * 3 + (square % 3);
            scope.push(variables[row*9 + col]);
        }
        constraints.push(new Constraint(`S${subsquare}`, scope, allDiff))
    }

    return new CSP("Sudoku", constraints);
}

/**
 * Converts a CSP to a board. The CSP must be created from the boardToCSP function.
 * Furthermore, the CSP must be solved to ensure every variable has an assigned value.
 * @param csp the csp to be turned into a board
 * @returns a 2D string array representing a board. The definition of a board can be found in
 * the docs for boardToCSP.
 */
export function CSPToBoard(csp: CSP): string[][] {
    let board = [];

    for(let subsquare = 0; subsquare < 9; subsquare++) {
        let values = []
        for(let square = 0; square < 9; square++) {
            let row = Math.floor(subsquare / 3) * 3 + Math.floor(square / 3);
            let col = (subsquare % 3) * 3 + (square % 3);
            values.push(csp.variables[row*9 + col].assigned_val);
        }
        board.push(values);
    }

    return board;
}