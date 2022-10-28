
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FilmComponent } from './film1/film.component';

@NgModule({
    declarations: [
        FilmComponent
    ],
    imports: [
        MatDialogModule,
    ],
    entryComponents: [
        
    ]
})
export class HomeModule { }