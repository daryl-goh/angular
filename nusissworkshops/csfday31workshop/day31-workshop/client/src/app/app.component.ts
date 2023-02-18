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
}
