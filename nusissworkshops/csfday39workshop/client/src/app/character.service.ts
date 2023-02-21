import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { MarvelCharacter } from "./MarvelCharacter.model";

@Injectable()

export class CharacterService {

    constructor(private httpClient:HttpClient) {}

    getCharacters(nameStartsWith:string, limit: number, offset: number) {

        const params = new HttpParams()
        .set('nameStartsWith', nameStartsWith)
        .set('limit', limit)
        .set('offset', offset);

        return lastValueFrom(this.httpClient
            .get<MarvelCharacter[]>('https://foregoing-bath-production.up.railway.app/api/characters', 
            { params: params }));
    }   
    
    getCharacterById(characterId: number) {
        return lastValueFrom(
          this.httpClient.get<MarvelCharacter>(
            `https://foregoing-bath-production.up.railway.app/api/character/${characterId}`
          )
        );
      }

    postComment(characterId: number, comment: string) {
        const body = {
            comment: comment
        }

        return lastValueFrom(
          this.httpClient.post(
            `https://foregoing-bath-production.up.railway.app/api/character/${characterId}`,
            body
          )
        );
      }

}    