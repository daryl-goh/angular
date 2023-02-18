import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CitiesService } from '../services/cities.service';
import { WeatherService } from '../services/weather.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  form!: FormGroup

  cityList: string[] = [];

  citiesSub$!: Subscription;


  constructor(private fb: FormBuilder, private weatherService: WeatherService, private citiesService: CitiesService) { }

  createForm() {
    return this.fb.group({
      city: this.fb.control<string>('', [Validators.required])
    })
  }

  ngOnInit(): void {
    // initialize  form
    this.form = this.createForm();

    // initialize cities by getting it from service
    this.cityList = this.citiesService.getCities();

    // subscribe to any changes in cities (only gets cities when new city is added)
    this.citiesSub$ = this.citiesService.onCitiesChange.subscribe((result) => {
      this.cityList = result;
    });
  }

  submitForm() {
    // add new city to cityList
    const cityName = this.form.get('city')?.value
    console.log('>>>>> city: ', cityName)

    // call service to add new city
    this.citiesService.addCity(cityName)
    
    // call service to add new city instead of pushing to cityList
    // this.cityList.push(cityName) 


  }

  /*
  prevent duplicates:
  create a custom function to check if form is valid
  */

  // returns true if form is valid and city is not a duplicate
  isFormValid() {
    return this.form.valid && !this.isDuplicateCity()
  }

  // returns true if city is a duplicate
  isDuplicateCity() {
    const cityName = this.form.get('city')?.value
    return this.cityList.includes(cityName)
  }


  ngOnDestroy(): void {
    this.citiesSub$.unsubscribe();
  }


}
