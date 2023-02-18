import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { City } from '../models/city.model';
import { CitiesService } from '../services/cities.service';
import { WeatherService } from '../services/weather.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  form!: FormGroup

  cityList: City[] = [];



  constructor(private fb: FormBuilder, private weatherService: WeatherService, private citiesService: CitiesService) { }

  createForm() {
    return this.fb.group({
      city: this.fb.control<string>('', [Validators.required])
    })
  }

  ngOnInit(): void {
    // initialize  form
    this.form = this.createForm();

    // initialize cities by getting it from IndexDB
    this.citiesService
      .getCities()
      .then((result) => (this.cityList = result))
      .catch((error) => console.log('>>>>> error: ', error));
      
    }

  
  

  submitForm() {
    // add new city to cityList
    const cityName = {
      name: this.form.get('city')?.value
    } as City; // cast object as City (convert string from form value to City)
    console.log('>>>>> city: ', cityName)

    // call service to add new city
    this.citiesService.addCity(cityName)
    
    // retrieve new list of cities
    this.ngOnInit()

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

    // returns City object if City object matches new name, otherwise return undefined
    // !! City object is truthy, undefined is falsy
    const isCityInList: boolean = !!this.cityList.find((c) => c.name === cityName)
    return isCityInList
  }




}
