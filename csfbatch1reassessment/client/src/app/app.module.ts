import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { PostListingComponent } from './post-listing/post-listing.component';
import { PostConfirmationComponent } from './post-confirmation/post-confirmation.component';
import { PostService } from './services/post.service';

const appRoutes: Route[] = [
  { path: '', component: CreateListingComponent },
  { path: 'post-listing', component: PostListingComponent },
  { path: 'post-confirmation', component: PostConfirmationComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full'}

];


@NgModule({
  declarations: [
    AppComponent,
    CreateListingComponent,
    PostListingComponent,
    PostConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
