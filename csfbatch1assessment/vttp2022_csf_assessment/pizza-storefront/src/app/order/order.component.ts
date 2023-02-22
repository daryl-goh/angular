import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderSummary } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderSummary: OrderSummary[] = [];

  emailFromForm!: string;

  params$!: Subscription

  constructor(private activatedRoute: ActivatedRoute, private pizzaSvc: PizzaService) { }
  
  ngOnInit() {
    this.params$ = this.activatedRoute.params.subscribe(params => {
      this.emailFromForm = params['email'];

      this.pizzaSvc.getOrders(this.emailFromForm)
        .then((orders) => {
        console.log(">>>> orders: ", orders)
        this.orderSummary = orders;

      }).catch((error) => {
        console.log(">>>> error: ", error)
      })


    });



}
}