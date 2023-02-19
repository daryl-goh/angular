import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input()
  cartList: CartItem[] = [];

  @Output()
  // onDelete = new Subject<CartItem>();
  onDelete = new Subject<number>();

  // deleteItem(item: CartItem) {
  //   this.onDelete.next(item);
  // }

  deleteItem(i: number) {
    console.info(`>>>> deleteItem: ${i}`);
    this.onDelete.next(i);
  }
}
