import { Variable, Constraint, CSP } from "./csp-utils";

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
function boardToCSP(board: string[][]): CSP {
    // TODO
    return null
}

/**
 * Converts a CSP to a board.
 * @param csp the csp to be turned into a board
 * @returns a 2D string array representing a board. The definition of a board can be found in
 * the docs for boardToCSP.
 */
function CSPToBoard(csp: CSP): string[][] {
    // TODO
    return null
}

export {};