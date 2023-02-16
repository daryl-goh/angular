import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { GamelistService } from '../services/gamelist.service';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit{
  
  games = [];


  constructor(private gamelistService: GamelistService) {}


  ngOnInit() {
   
    this.gamelistService
      .getGames(10, 0)
      .then((result) => {
        console.log(">>>> results: ", result);
        // assign array of games to gamelist component's games
        this.games = result.games;})
      .catch((error) => 
        console.error(">>>> error: ", error))
  }
}



