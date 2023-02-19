import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";

@Injectable() 

export class View0Service {
    
    PUBLIC_API_KEY = ''
    MD5_HASH = ''

    constructor(private httpClient: HttpClient) {}

    getCharacters(name: string): Promise<any> {
        const params = new HttpParams()
            .set('nameStartsWith', name)
            .set('apikey', this.PUBLIC_API_KEY)
            .set('ts', '1')
            .set('hash', this.MD5_HASH)
        
        return lastValueFrom(this.httpClient.get('localhost:8080', {params}));
    }


}
