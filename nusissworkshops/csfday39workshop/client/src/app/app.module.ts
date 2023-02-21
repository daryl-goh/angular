import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './materials.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterlistComponent } from './characterlist/characterlist.component';
import { CharacterdetailsComponent } from './characterdetails/characterdetails.component';
import { CommentformComponent } from './commentform/commentform.component';
import { SearchComponent } from './search/search.component';
import { CharacterService } from './character.service';

const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'search', component: SearchComponent },
  { path: 'characters', component: CharacterlistComponent },
  { path: 'characters/:characterId', component: CharacterdetailsComponent },
  { path: 'characters/:characterId/comment', component: CommentformComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    CharacterlistComponent,
    CharacterdetailsComponent,
    CommentformComponent,
    SearchComponent,
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [CharacterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
