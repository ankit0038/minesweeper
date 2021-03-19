import { Component, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({providedIn: 'root'})
export class GameOver {
    constructor(public dialog: MatDialog){}

    gameOverDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.width = "400px";
        const dialogRef = this.dialog.open(GameOverDialogComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
        return dialogRef;
    }
}


@Component({
    selector: 'game-over-dialog',
    templateUrl: 'game-over-dialog.component.html'
})
export class GameOverDialogComponent {}