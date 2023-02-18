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
  

  itemList: CartItem[] = [
    {description: 'apple', image: 'apple'},
    {description: 'blueberries', image: 'blueberries'},
    {description: 'mushroom', image: 'mushroom'}
  ]

  addToCart(description: string) {
    
    const selectedItem = {
      description
      
    } as CartItem;
    this.onSelection.next(selectedItem);

    console.log('>>>> added to cart:', selectedItem);
  }


}
