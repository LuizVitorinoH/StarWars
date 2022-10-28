import { Films } from './../models/films';
import { Character } from './../models/character';
import { Component, OnInit, AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import { fadeInAnimation } from '../_animations/index';
import { characterService } from '../services/character.service';
import { filmsService } from '../services/films.service';
import { FilmComponent } from './film1/film.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'sw-home',
  animations: [fadeInAnimation],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { '[@fadeInAnimation]': '' }
})
export class HomeComponent implements OnInit{
  @ViewChild('myModal') myModal;
  @ViewChild('carousel') carousel: ElementRef;
  @Input() threshold = 150;
  @Input() slideWidth = 250;
  @Input() animationDuration = 700;
  @Input() slides = [
    {  id: 6, director: '', title: '', release_date: '' , opening_crawl:'', characters:'', producer:'' },
    {  id: 1, director: '', title: '', release_date: '', opening_crawl:'', characters:'', producer:'' },
    {  id: 2, director: '', title: '', release_date: '', opening_crawl:'', characters:'', producer:'' },
    {  id: 3, director: '', title: '', release_date: '', opening_crawl:'', characters:'', producer:'' },
    {  id: 4, director: '', title: '', release_date: '' , opening_crawl:'', characters:'', producer:''},
    {  id: 5, director: '', title: '', release_date: '', opening_crawl:'', characters:'', producer:'' },
  ];

  @Input() slidescharacters = [
    { id: 6, name:'', birth_year:'', height:''},
    { id: 1, name:'', birth_year:'', height:''},
    { id: 2, name:'', birth_year:'', height:''},
    { id: 3, name:'', birth_year:'', height:''},
    { id: 4, name:'', birth_year:'', height:''},
    { id: 5, name:'', birth_year:'', height:''},
    { id: 7, name:'', birth_year:'', height:''},
    { id: 8, name:'', birth_year:'', height:''},
    { id: 9, name:'', birth_year:'', height:''},
    { id: 10, name:'', birth_year:'', height:''},
  ];
  private modalRef;
  private character: Character[];
  private films: Films[];
  public dragStart;
  public dragEnd;
  public animating = false;
  public slideSelected = false;
  public animateDirection: -1 | 0 | 1 = 0;
  public animateDirectionCharacter: -1 | 0 | 1 = 0;
  public animatingCharacter = false;
  public slideSelectedCharacter = false;
  loading: boolean;

  constructor(
    private characterService: characterService,
    private filmsService: filmsService,
    private _matDialog: MatDialog,

 
    ) { 
      this.films = new Array<Films>();
      this.character = new Array<Character>();
    }

  ngOnInit(): void {
    this.loading = true;
    this.characterService.getAllCharacter()
      .subscribe((data) => {
        
        data.results.forEach((element, index) => {
       
          /* let film = {
             id: this.slides[index],
             characters: element.characters,
             director: element.director,
             opening_crawl: element.opening_crawl,
             release_date: element.release_date,
             title: element.title
           }*/
           this.slidescharacters[index].name = element.name;
           this.slidescharacters[index].birth_year = element.birth_year;
           this.slidescharacters[index].height = element.height;
           
           
         });
      });
      this.filmsService.getAllFilms()
      .subscribe((data) => {
        
        data.results.forEach((element, index) => {
          this.slides[index].director = element.director;
          this.slides[index].release_date = element.release_date;
          this.slides[index].title = element.title;
          this.slides[index].opening_crawl = element.opening_crawl;
          this.slides[index].characters = element.characters;
          this.slides[index].producer = element.producer;
          
        });
        this.loading = false;
      });
      
  }

  carouselStyle() {
    return {
      left: `${this.slides.length > 3 ? -100 : 0}px`,
      transform: this.slideSelected ?
        `translateX(${this.dragPos()}px)` :
        `translateX(${(this.animating ? this.animateDirection * this.slideWidth : 0)}px)`,
      transition: this.animating ? `${this.animationDuration}ms` : 'none'
    };
  }

  trackByFn(i, v) {
    return i;
  }

  nextSlide() {
    this.shiftSlide(1);
  }

  prevSlide() {
    this.shiftSlide(-1);
  }

  shiftOne(arr, direction) {
    direction > 0 ? arr.unshift(arr.pop()) : arr.push(arr.shift());
  }

  selectSlide(e, selected) {
    e.stopPropagation();
    if (this.animating) { return; }
    this.slideSelected = selected;
    if (selected) {
      this.dragStart = e.pageX;
      return;
    }
    if (this.dragPos() > 0) { return this.shiftSlide(1); }
    if (this.dragPos() < 0) { return this.shiftSlide(-1); }
    this.shiftSlide(-1);
  }

  dragSlide(e) {
    e.stopPropagation();
    this.dragEnd = e.pageX;
  }

  dragPos() {
    return this.dragEnd - this.dragStart;
  }

  shiftSlide(direction) {
    if (this.animating) return;
    this.animateDirection = direction;
    this.dragEnd = this.dragStart;
    this.animating = true;
    setTimeout(() => {
      this.shiftOne(this.slides, direction)
      this.animating = false;
    }, this.animationDuration);
  }
  ///////////////////////////////////
  carouselStyleCharacter() {
    return {
      left: `${this.slidescharacters.length > 3 ? -100 : 0}px`,
      transform: this.slideSelectedCharacter ?
        `translateX(${this.dragPosCharacter()}px)` :
        `translateX(${(this.animatingCharacter ? this.animateDirectionCharacter * this.slideWidth : 0)}px)`,
      transition: this.animatingCharacter ? `${this.animationDuration}ms` : 'none'
    };
  }

  trackByFnCharacter(i, v) {
    return i;
  }

  nextSlideCharacter() {
    this.shiftSlideCharacter(1);
  }

  prevSlideCharacter() {
    this.shiftSlideCharacter(-1);
  }

  shiftOneCharacter(arr, direction) {
    direction > 0 ? arr.unshift(arr.pop()) : arr.push(arr.shift());
  }

  selectSlideCharacter(e, selected) {
    e.stopPropagation();
    if (this.animating) { return; }
    this.slideSelectedCharacter = selected;
    if (selected) {
      this.dragStart = e.pageX;
      return;
    }
    if (this.dragPosCharacter() > 0) { return this.shiftSlideCharacter(1); }
    if (this.dragPosCharacter() < 0) { return this.shiftSlideCharacter(-1); }
    this.shiftSlideCharacter(-1);
  }

  dragSlideCharacter(e) {
    e.stopPropagation();
    this.dragEnd = e.pageX;
  }

  dragPosCharacter() {
    return this.dragEnd - this.dragStart;
  }

  shiftSlideCharacter(direction) {
    if (this.animating) return;
    this.animateDirectionCharacter = direction;
    this.dragEnd = this.dragStart;
    this.animatingCharacter = true;
    setTimeout(() => {
      this.shiftOneCharacter(this.slidescharacters, direction)
      this.animatingCharacter = false;
    }, this.animationDuration);
  }

  openDialog(film) {
    this._matDialog.closeAll();
    const modalRef = (this._matDialog.open(FilmComponent, {
      panelClass: 'dialog-layout-w110',   
      data: film
    }));
  }
}
