import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { WebcamModule } from 'ngx-webcam'

import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { UploadComponent } from './upload/upload.component';
import { RouterModule, Routes } from '@angular/router';
import { CameraService } from './camera.service';

const appsRoute: Routes = [
  { path: '', component: CameraComponent },
  { path: 'upload', component: UploadComponent},
  { path: '**', redirectTo: "/", pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    WebcamModule,
    RouterModule.forRoot(appsRoute)
  ],
  providers: [ CameraService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
