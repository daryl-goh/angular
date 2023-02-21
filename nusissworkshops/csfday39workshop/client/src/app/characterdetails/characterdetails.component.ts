import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CharacterService } from '../character.service';
import { MarvelCharacter } from '../MarvelCharacter.model';

@Component({
  selector: 'app-characterdetails',
  templateUrl: './characterdetails.component.html',
  styleUrls: ['./characterdetails.component.css']
})
export class CharacterdetailsComponent implements OnInit, OnDestroy {
  characterId!: number;
  routeSub$!: Subscription;
  character!: MarvelCharacter;

  constructor(
    private activatedRoute: ActivatedRoute,
    private characterSvc: CharacterService
  ) {}

  ngOnInit(): void {
    // get character id from current route
    this.routeSub$ = this.activatedRoute.params.subscribe((params) => {
      this.characterId = params['characterId'];
    });

    // retrieve character details from server
    this.characterSvc
      .getCharacterById(this.characterId)
      .then((res) => {
        this.character = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }
}