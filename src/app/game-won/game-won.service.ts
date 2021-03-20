import { Component, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({providedIn: 'root'})
export class GameWon {
    constructor(public dialog: MatDialog){}

    gameWonDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.width = "400px";
        const dialogRef = this.dialog.open(GameWonDialogComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
        return dialogRef;
    }
}


@Component({
    selector: 'game-won-dialog',
    templateUrl: 'game-won.component.html'
})
export class GameWonDialogComponent {}