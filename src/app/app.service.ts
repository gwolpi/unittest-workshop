import { Injectable } from '@angular/core';
import {HttpClient  } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  multiplyValueByFour(value: number) {
    return value * 4;
  }

  getCharacter(id: number): Observable<Character> {
    return this.httpClient.get<Character>(`https://anapioficeandfire.com/api/characters/${id}`)
  }

  constructor(private readonly httpClient: HttpClient) { }
}
