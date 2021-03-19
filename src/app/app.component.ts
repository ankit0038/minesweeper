import { Component } from '@angular/core';
import { Board } from './game/board';
import { Cell } from './game/cell';
import { GameOver } from './game-over/game-over.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'minesweeper';
  board: Board;

  constructor(public gameOver: GameOver) {
    this.board = new Board(10, 10, 10);
  }

  reset() {
    this.board = new Board(10, 10, 10);
  }

  onClickOfCell(cell: Cell) {
    cell.state = 'open';
    if(cell.isMine){
      this.gameOver.gameOverDialog().afterClosed().subscribe(result => {
        this.reset();
      });
    }
  }
}
