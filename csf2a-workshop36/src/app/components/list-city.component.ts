import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.css']
})
export class ListCityComponent implements OnInit{
  
  cities: any;
  
  constructor(private weatherSvc: WeatherService){

  }

  ngOnInit(): void {
      this.cities = this.weatherSvc.countries;
  }

}
