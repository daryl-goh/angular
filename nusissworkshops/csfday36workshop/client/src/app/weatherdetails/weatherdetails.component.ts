import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Weather } from '../models/weather.model';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnInit, OnDestroy {

  weatherResult!: Weather;
  city!: string;
  routeSub$!: Subscription; // should unsubscribe when component is destroyed 
    
  constructor(
    private weatherService: WeatherService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // set city to current route path variable
    this.routeSub$ = this.activatedRoute.params.subscribe(params => {
      // assign city to route path variable
      this.city = params['city'];

      this.getWeather();
    })
      

  }
  
  getWeather() {
    this.weatherService
      .getWeather(this.city) // returns a Promise
      .then((result) => {
        // promise resolve (successful)
        // map response to Weather model and assign to weatherResult
        this.weatherResult = {
          city: result.name,
          description: result.weather[0].description,
          temp: result.main.temp,
          humidity: result.main.humidity,
          windSpeed: result.wind.speed,
          windDegree: result.wind.deg,
        } as Weather;
        console.log('>>>> result:', result)
      })
      .catch((error) => {
        console.error('>>>> error: ', error)
      })

  }

  ngOnDestroy() {
    this.routeSub$.unsubscribe();
  }


}
