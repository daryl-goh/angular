// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type 

import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order, OrderSummary } from "./models";
import { lastValueFrom } from "rxjs";

@Injectable()
export class PizzaService {

  constructor(private httpClient: HttpClient) { }

  // POST /api/order
  // Add any required parameters or return type
  createOrder(order: Order): Promise<any> {

    const payload = {
      name: order.name,
      email: order.email,
      size: order.size,
      base: order.base == "thick" ? true : false,
      sauce: order.sauce,
      toppings: order.toppings,
      comments: order.comments
    }
    console.log(">>>> payload: ", payload)
    return lastValueFrom(this.httpClient.post<any>('/api/order', payload));
  }

    
  

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrders(email: string): Promise<OrderSummary[]> {
    return lastValueFrom(this.httpClient.get<any>(`/api/order/${email}/all`));
  }


  

}
