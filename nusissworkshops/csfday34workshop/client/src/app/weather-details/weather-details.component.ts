import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Weather } from '../weather.model';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent {

  weatherForm!: FormGroup;
  weatherResult!: Weather;

  constructor(private fb: FormBuilder, private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      city: this.fb.control<string>('', [Validators.required])
    });
  }

  getWeather() {
    const city = this.weatherForm.value.city
    console.log('>>>> weatherForm.value:', this.weatherForm.value);
    this.weatherService
      .getWeather(city) // returns a Promise
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



}
