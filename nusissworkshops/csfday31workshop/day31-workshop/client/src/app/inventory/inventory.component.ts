import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../cart.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  @Output()
  onSelection = new Subject<CartItem>()

  quantity = 1
  

  itemList: CartItem[] = [
    {description: 'apple', image: 'apple', quantity: 0 },
    {description: 'blueberries', image: 'blueberries', quantity: 0},
    {description: 'mushroom', image: 'mushroom', quantity: 0},
    {description: 'eggplant', image: 'eggplant', quantity: 0},
    {description: 'zucchini', image: 'zucchini', quantity: 0}
  ]

  addToCart(item: CartItem) {
    
    const selectedItem = {
      description: item.description,
      image: item.image,
      quantity: this.quantity
      
    } as CartItem;
    this.onSelection.next(selectedItem);

    console.log('>>>> added to cart:', selectedItem);
    this.quantity = 1
  }

  increaseQuantity(i: number) {
    this.quantity += i;
  }


}
