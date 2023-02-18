import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()

// resposible for maintaining the state of cities added
export class CitiesService {
    cities : string[] = ['Singapore', 'Hong Kong', 'Taipei'];
    // observable to notify subscribers of changes to cities list and other components can subscribe to it
    onCitiesChange: Subject<string[]> = new Subject();

    addCity(city: string): void {
        // spread operator
        // returns a new list with new city added
        // .push() does not return a new list
        // will help to trigger change detection

        // adds new city
        this.cities = [...this.cities, city];
        console.log('>>>>> cities: ', this.cities)

        // fire event containing updated cities list
        this.onCitiesChange.next(this.cities);

    }

    getCities(): string[] {
        // returns a copy of cities
        return this.cities.slice();
    }
 

}