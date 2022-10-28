import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Character } from "../models/character";

@Injectable()
export class characterService {
    readonly endpoint = 'http://swapi.dev/api/people'

    constructor(private http: HttpClient) { }

    getAllCharacter(): Observable<any> {
        return this.http.get<any>(this.endpoint)
    }
}