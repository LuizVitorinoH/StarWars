import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Films } from "../models/films";

@Injectable()
export class filmsService {
    readonly endpoint = 'http://swapi.dev/api/films'

    constructor(private http: HttpClient) { }

    getAllFilms(): Observable<any> {
        return this.http.get<any>(this.endpoint)
    }
}