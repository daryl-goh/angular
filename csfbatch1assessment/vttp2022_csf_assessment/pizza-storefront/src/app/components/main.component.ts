import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../models';
import { Router } from '@angular/router';
import { PizzaService } from '../pizza.service';

const SIZES: string[] = [
  "Personal - 6 inches",
  "Regular - 9 inches",
  "Large - 12 inches",
  "Extra Large - 15 inches"
]

const PizzaToppings: string[] = [
    'chicken', 'seafood', 'beef', 'vegetables',
    'cheese', 'arugula', 'pineapple'
]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  form!: FormGroup;

  pizzaSize = SIZES[0]

  constructor(private fb: FormBuilder, private router: Router, private pizzaSvc: PizzaService) {}

  createForm() {
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      size: this.fb.control<number>(0, [Validators.required]),
      base: this.fb.control<boolean>(false, [Validators.required]),
      sauce: this.fb.control<string>('', [Validators.required]),
      toppings: this.fb.array([], [Validators.required]),
      comments: this.fb.control<string>('')
    })
    
  }

  ngOnInit() {
    this.form = this.createForm()
  }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)]
  }

  submitForm() {
    if (this.form.valid) {
      const emailFromForm = this.form.get('email')?.value
      console.log("emailFromForm: ", emailFromForm)
      this.router.navigate(['/orders', emailFromForm]);
    }
    this.pizzaSvc.createOrder(this.form.value)
      .then((result) => {
      console.log("result: ", result)
    } )
      .catch((error) => {
      console.log("error: ", error)
    })    
  }

  listOrders() {
    if (this.form.valid) {
      const emailFromForm = this.form.get('email')?.value
      console.log("emailFromForm: ", emailFromForm)
      this.router.navigate(['/orders', emailFromForm]);
    }
    this.pizzaSvc.getOrders(this.form.get('email')?.value)
      .then((result) => {
      console.log("result: ", result)
    })
      .catch((error) => {
        console.log("error: ", error)
      })
    }


  formEnable() {
    return this.form.valid 
  }

  emailEnable() {
    return this.form.get('email')?.valid
  }

  onCheckboxChange(e: { target: { checked: any; value: any; }; }) {
    const toppings: FormArray = this.form.get('toppings') as FormArray;

    if (e.target.checked) {
      toppings.push(new FormControl(e.target.value));
    } else {
       const index = toppings.controls.findIndex(x => x.value === e.target.value);
       toppings.removeAt(index);
    }

  }

}
