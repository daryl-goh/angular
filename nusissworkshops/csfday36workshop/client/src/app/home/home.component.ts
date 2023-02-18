import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../services/weather.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  weatherForm!: FormGroup

  cityList: string[] = ['Bangkok', 'London', 'Paris', 'New York', 'Tokyo'];


  constructor(private fb: FormBuilder, private weatherService: WeatherService) { }

  createForm() {
    return this.fb.group({
      city: this.fb.control<string>('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.weatherForm = this.createForm();
  }

  onAdd() {
    const cityName = this.weatherForm.get('city')?.value
    console.log('>>>>> city: ', cityName)
    this.cityList.push(cityName) 
    console.log('>>>>> countryList: ', this.cityList)
    this.weatherService.getWeather(cityName)
      .then((result) => {
        console.log(">>>>> result: ", result)
        temp = result.main.temp
        console.log(">>>>> temp: ", temp)
      })
      .catch((error) => {
        console.log(">>>>> error: ", error)
      })
  }


}
