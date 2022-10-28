import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-film',
    templateUrl: './film.component.html',
    styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

    public film;

    constructor(
        @Inject(MAT_DIALOG_DATA) public obj: any,
        public dialog: MatDialogRef<FilmComponent>
    ) { 
        this.film = obj;
    }

    ngOnInit() {
        console.log(this.film);
    }

    close() {
        this.dialog.close();
    }
}
