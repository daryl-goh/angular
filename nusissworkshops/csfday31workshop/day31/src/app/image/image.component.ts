import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { myImage } from '../model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  @Input()
  imageURL = "/assets/elon.png"

  
  width = 200

  
  onClicked = new Subject<myImage>( )

  imageClicked() {
    const img: myImage = {
      imageName: "Elon Musk",
      size: this.width
    }
    console.log("Image clicked: " + img.imageName + " " + img.size)
    this.onClicked.next(img);
  }


  increaseSize() {
    this.width++
  }

  decreaseSize() {
    this.width--
  }

  resize(factor: number) {
    this.width = this.width + factor
  }
}
