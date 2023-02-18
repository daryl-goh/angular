import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { Subject } from "rxjs";
import { City } from "../models/city.model";

@Injectable()

// resposible for maintaining the state of cities added
export class CitiesService extends Dexie {
    cities : string[] = [];
  
    // references the IndexDB table
    // type of object we are storing, type of primary key
    citiesTable!: Dexie.Table<City, number> 

    // create indexed db to save cities list
    constructor() {
        super('citiesDB') // name of indexed db
        this.version(1).stores({
            // create table 'cities' with PK cityId
            cities: '++cityId' // auto increment cityId
        });
        this.citiesTable = this.table('cities');
    }

    addCity(city: City): Promise<number> {
        return this.citiesTable.add(city);
    }


    getCities(): Promise<City[]> {
        // returns a copy of cities
        return this.citiesTable.toArray();
    }
 

}