import { Component } from '@angular/core';
import { Board } from './game/board';
import { Cell } from './game/cell';
import { GameOver } from './game-over/game-over.service';
import { GameWon } from './game-won/game-won.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'minesweeper';
  board: Board;

  constructor(public gameOver: GameOver, public gameWon: GameWon) {
    this.board = new Board(9, 9, 12);
  }

  reset() {
    this.board = new Board(9, 9, 12);
  }

  onClickOfCell(cell: Cell) {
    if(cell.state == 'close') {
      cell.state = 'open';
      if(cell.isMine){
        this.gameOver.gameOverDialog().afterClosed().subscribe(result => {
          this.board.revealAll();
        });
      }else if(cell.proximityMines === 0){
        this.board.score++;
        this.board.revealAllEmptyNeighbouringCells(cell);
      }else{
        this.board.score++;
        this.board.nUnExposedCells--;
      }
      if(this.board.nUnExposedCells === this.board.nMines){
        this.gameWon.gameWonDialog().afterClosed().subscribe(result => {
          this.board.revealAll();
        });
      }
      console.log(this.board.nUnExposedCells);
    }
  }

  getCellClass(cell: Cell): string {
    return 'num-cell-'+cell.proximityMines;
  }
}
