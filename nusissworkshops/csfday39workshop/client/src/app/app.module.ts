import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { View0Component } from './view0/view0.component';
import { View1Component } from './view1/view1.component';
import { View2Component } from './view2/view2.component';
import { View3Component } from './view3/view3.component';
import { HttpClientModule } from '@angular/common/http';
import { View0Service } from './services/view0/view0.service';


const appRoutes: Routes = [
  { path: '', component: View0Component },
  { path: 'view0', component: View0Component },
  { path: 'view1', component: View1Component },
  { path: 'view2', component: View2Component },
  { path: 'view3', component: View3Component },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    View0Component,
    View1Component,
    View2Component,
    View3Component
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [View0Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
