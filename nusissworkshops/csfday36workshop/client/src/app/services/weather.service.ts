import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";

@Injectable()

export class WeatherService {
    
    private API_KEY = 'f1e4d5497d5752aa15e7ef9c46277a28'

    constructor(private httpClient: HttpClient) { }

    getWeather(city: string): Promise<any> {

        const params = new HttpParams()
            .set('q', city)
            .set('appid', this.API_KEY);

        return lastValueFrom(this.httpClient.get('https://api.openweathermap.org/data/2.5/weather', { params: params}));
    }

}