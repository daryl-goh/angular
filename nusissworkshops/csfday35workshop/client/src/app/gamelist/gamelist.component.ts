import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Game } from '../gamelist.model';
import { GamelistService } from '../services/gamelist.service';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit{
  
  games: Game[] = [];
  limitOptions: number[] = [5, 10, 15, 20]
  currLimit: number = 10;
  currOffset: number = 0;


  constructor(private gamelistService: GamelistService) {}


  ngOnInit() {
   
    this.gamelistService
      .getGames(this.currLimit, this.currOffset)
      .then((result) => {
        console.log(">>>> results: ", result);
        // assign array of games to gamelist component's games
        this.games = result.games;})
      .catch((error) => 
        console.error(">>>> error: ", error))
  }

  onLimitChange(newLimit: MatSelectChange) {
    // set new Limit
    this.currLimit = newLimit.value

    // make another request to server with new limit
    this.ngOnInit();
  } 

  onChangePage(changeBy: number) {
    // changeBy = -1 if prev page or 1 if next page
    // current page: 2, limit: 10, offset: 10 (rows 11-20)
    // prev page: 1, limit 10, offset: 10 + 10 * -1 = 0
    // next page: 3, limit 10, offset: 10 + 10 * 1 = 20
    this.currOffset = this.currOffset + this.currLimit * changeBy;

    // make another request to server
    this.ngOnInit();
  }

  // onChangePage method is a combination of the below onPrevPage and onNextPage methods

  // onPrevPage() {
  //   // set new Offset
  //   // if current page: 2 -> limit: 10, offset: 10 (rows 11 - 20)
  //   // then previous page: 1 -> limit: 10, offset: 0 (rows 0 - 10)
  //   this.currOffset = this.currOffset - this.currLimit

  //   // make another request to server
  //   this.ngOnInit()
  // }
  
  // onNextPage() {
  //   // set new Limit
  //   // if current page: 2 -> limit: 10, offset: 10 (rows 11 - 20)
  //   // then next page: 3 -> limit: 10, offset: 20 (rows 21 - 30)
  //   this.currOffset = this.currOffset + this.currLimit
    
  //   // make another request to server
  //   this.ngOnInit()
  // }
}



