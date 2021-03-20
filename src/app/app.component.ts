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
    this.board = new Board(10, 10, 10);
  }

  reset() {
    this.board = new Board(10, 10, 10);
  }

  onClickOfCell(cell: Cell) {
    if(cell.state == 'close') {
      cell.state = 'open';
      if(cell.isMine){
        this.gameOver.gameOverDialog().afterClosed().subscribe(result => {
          this.reset();
        });
      }else if(cell.proximityMines === 0){
        this.board.revealAllEmptyNeighbouringCells(cell);
      }else{
        this.board.nUnExposedCells--;
      }
      if(this.board.nUnExposedCells === this.board.nMines){
        this.gameWon.gameWonDialog().afterClosed().subscribe(result => {
          this.reset();
        });
      }
      console.log(this.board.nUnExposedCells);
    }
  }
}
