import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherdetailsComponent } from './weatherdetails/weatherdetails.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { WeatherService } from './services/weather.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weatherdetails', component: WeatherdetailsComponent },
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
