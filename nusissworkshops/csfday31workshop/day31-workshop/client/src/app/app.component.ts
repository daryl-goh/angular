import { Component } from '@angular/core';
import { CartItem } from './cart.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cartList: CartItem[] = [];


  selected(item: CartItem) {
    console.log('>>>> selected:', item);
    this.cartList.push(item);
  }

  deleted(i: number) {
    this.cartList.splice(i, 1);
    console.log('>>>> deleted:', i);
    // this.cartList = this.cartList.filter(cartItem => cartItem !== item);

  }
}
