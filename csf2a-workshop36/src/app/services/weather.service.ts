import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { City } from '../model/City';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  countries = [
    {countryName: 'China', city: 'Beijing'},
    {countryName: 'Malaysia', city: 'Kuala Lumpur'},
    {countryName: 'India', city: 'New Delhi'},
    {countryName: 'Singapore', city: 'Singapore'},
  ]

  imgMapBasedCity = [
    { city: 'Beijing', imageUrl: 'https://bit.ly/40NVxEi'},
    { city: 'Kuala Lumpur', imageUrl: 'https://bit.ly/3RR8d9m'},
    { city: 'New Delhi', imageUrl: 'https://bit.ly/3Xp16Go'},
    { city: 'Singapore', imageUrl: 'https://bit.ly/3lAQDdq'},
  ]

  constructor(private httpClient : HttpClient) { }

  getWeather(city: string , apiKey: string): Promise<any>{
    const params = new HttpParams()
      .set("q", city)
      .set("appid", apiKey);

    return lastValueFrom(this.httpClient
        .get(environment.openweather_api_url, {params: params}))
  }

  addCity(city: City){
    this.countries.push({countryName: city.country, city: city.city});
    this.countries.sort((a,b) => (a.countryName > b.countryName ? 1: -1));
    this.imgMapBasedCity.push({ city: city.city, imageUrl: `${city.imageUrl}`});
  }

}
