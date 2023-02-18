import { Component, Input } from '@angular/core';
import { CartItem } from '../cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input()
  cartList: CartItem[] = [];
}
