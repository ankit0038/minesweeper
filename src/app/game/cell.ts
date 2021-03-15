export class Cell {
    row: number = 0;
    col: number = 0;
    isMine: boolean = false;
    proximityMines: number = 0;
    state: 'close' | 'open' = 'close';
    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }
}