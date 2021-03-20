import { Cell } from './cell';

const NEIGHBOURS = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
export class Board {
    nRows: number = 0;
    nCols: number = 0;
    nMines: number = 0;
    nUnExposedCells: number;
    board: Cell[][] = [];
    constructor(rows: number, cols: number, mines: number) {
        this.nRows = rows;
        this.nCols = cols;
        this.nMines = mines;
        this.nUnExposedCells = rows * cols;
        this.initBoard();
        this.assignMines();
        this.calculateProximityMines();
    }

    initBoard(){
        for(let row = 0; row < this.nRows; row++){
            this.board[row] = [];
            for(let col = 0; col < this.nCols; col++){
                this.board[row][col] = new Cell(row, col);
            }
        }
    }

    assignMines() {
        for(let mine = 0; mine < this.nMines; mine++){
            let randomCell = this.getRandomCell();
            if(!randomCell.isMine){
                randomCell.isMine = true;
            }else{
                mine--;
            }
        }
    }

    getRandomCell(): Cell {
        let randomRow = this.getRandomInt(this.nRows);
        let randomCol = this.getRandomInt(this.nCols);
        return this.board[randomRow][randomCol];
    }

    getRandomInt(max: number): number{
        return Math.floor(Math.random() * Math.floor(max));
    }

    calculateProximityMines() {
        for(let row = 0; row < this.nRows; row++){
            for(let col = 0; col < this.nCols; col++){
                if(this.board[row][col].isMine){
                    for(const adjacent of NEIGHBOURS){
                        if(this.validateBoundaries(row + adjacent[0], col + adjacent[1])){
                            this.board[row + adjacent[0]][col + adjacent[1]].proximityMines++;
                        }
                    }
                }
            }
        }
    }

    validateBoundaries(row: number, col: number): boolean {
        return (row >=0 && row < this.nRows && col >= 0 && col < this.nCols);
    }

    revealAllEmptyNeighbouringCells(cell: Cell){
        cell.state = 'open';
        this.nUnExposedCells--;
        if(cell.proximityMines == 0){
            for(const adjacent of NEIGHBOURS){
                let r = cell.row + adjacent[0];
                let c = cell.col + adjacent[1];
                if(this.validateBoundaries(r, c)){
                    if(!this.board[r][c].isMine && this.board[r][c].state == 'close'){
                        this.revealAllEmptyNeighbouringCells(this.board[r][c]);
                    }
                }
            }
        }
    }

    revealAll(){
        for(let row = 0; row < this.nRows; row++){
            for(let col = 0; col < this.nCols; col++){
                for(const adjacent of NEIGHBOURS){
                    if(this.validateBoundaries(row + adjacent[0], col + adjacent[1])){
                        this.board[row][col].state = 'open';
                    }
                }
            }
        }
    }
}