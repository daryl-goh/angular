import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GamelistService {

  constructor(private http: HttpClient) { }

  getGames(limit: number, offset: number): Promise<any> {

    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    return (lastValueFrom(this.http.get('http://localhost:8080/games', { params})));
  }
}
