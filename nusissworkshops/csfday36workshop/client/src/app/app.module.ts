import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherdetailsComponent } from './weatherdetails/weatherdetails.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CitiesService } from './services/cities.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cities', component: HomeComponent },
  { path: 'weather/:city', component: WeatherdetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    WeatherdetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [WeatherService, CitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
