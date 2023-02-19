import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { View0Service } from '../services/view0/view0.service';

@Component({
  selector: 'app-view0',
  templateUrl: './view0.component.html',
  styleUrls: ['./view0.component.css']
})
export class View0Component implements OnInit{

  heroForm!: FormGroup;

  constructor(private fb: FormBuilder, private view0Service: View0Service) {}  

  createForm() {
    return this.fb.group({
      heroName: this.fb.control<string>('', [Validators.required, Validators.minLength(3)])
    })
  }

  ngOnInit() {
    this.heroForm = this.createForm();
  }
  
  getCharacters() {
    const heroName = this.heroForm.get('heroName')?.value;
    this.view0Service.getCharacters(heroName)
      .then((data) => {
      console.log(data);
      })
      .catch((err) => {
      console.log(err);
      })
  }

}
