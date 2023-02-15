import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild('file') uploadedImage!: ElementRef;

  form!: FormGroup;
  uploadStatus: string = "not uploaded yet";

  constructor( private fb: FormBuilder, private postService: PostService)  { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm() {
    return this.form = this.fb.group({
      picture: this.fb.control(''),
      comments: this.fb.control('')
    })
  }



  uploadImage() {
    const comments = this.form.get('comments')?.value;
    console.log(this.form.get('comments')?.value);

    //Extract file image from html element
    const picture = this.uploadedImage.nativeElement.files[0];
    console.log(this.uploadedImage.nativeElement.files[0]); 

    // call service to send POST request
    this.postService.createPost(comments, picture).then((result) => {
      console.log(result);
      this.uploadStatus = "uploaded";
      }).catch((error) => {
        console.log(error);
        this.uploadStatus = "not uploaded";
      });
     



  }

}