
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRouting } from './app.routes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { MatDialogModule } from '@angular/material/dialog';

import { HomeComponent } from './home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ShellComponent } from './shell/shell.component';
import { characterService } from './services/character.service';
import { filmsService } from './services/films.service';
import { FilmComponent } from './home/film1/film.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoadingComponent,
    ShellComponent,
    FilmComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouting,
    BrowserAnimationsModule,
    MatDialogModule,


  ],
  entryComponents: [
    FilmComponent
 ],
  providers: [characterService, filmsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
