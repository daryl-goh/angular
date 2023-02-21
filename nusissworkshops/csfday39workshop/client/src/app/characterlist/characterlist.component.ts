import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CharacterService } from '../character.service';
import { MarvelCharacter } from '../MarvelCharacter.model';

@Component({
  selector: 'app-characterlist',
  templateUrl: './characterlist.component.html',
  styleUrls: ['./characterlist.component.css'],
})
export class CharacterlistComponent implements OnInit, OnDestroy {
  nameStartsWith!: string; // passed from search component
  routeSub$!: Subscription;
  currLimit: number = 10;
  currOffset: number = 0;
  characters: MarvelCharacter[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private characterSvc: CharacterService
  ) {}

  ngOnInit(): void {
    // subscribe to changes in current route
    this.routeSub$ = this.activateRoute.queryParams.subscribe((params) => {
      // set nameStartsWith to current route query parameter
      this.nameStartsWith = params['nameStartsWith'];
      this.getCharacters();
    });
  }

  getCharacters() {
    // get list of characters starting with nameStartsWith
    this.characterSvc
      .getCharacters(this.nameStartsWith, this.currLimit, this.currOffset)
      .then((res) => {
        this.characters = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }

  onChangePage(changeBy: number): void {
    // change offset and make new request to server
    this.currOffset = this.currOffset + this.currLimit * changeBy;
    this.getCharacters();
  }
}