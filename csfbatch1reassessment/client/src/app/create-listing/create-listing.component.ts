import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit{


  form!: FormGroup;

  constructor(private fb: FormBuilder, private postSvc: PostService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.createForm();
    };


  createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.email, Validators.maxLength(128)]),
      phone: this.fb.control(''),
      title: this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(128)]),
      description: this.fb.control('', [Validators.required]),
      image: this.fb.control('', [Validators.required])
    });
  }

  submitForm() {
    console.log(this.form.value);
    // const picture = this.form.get('image')?.value;
    this.postSvc.createPost(this.form)
      .then((result) => {
      console.log(result);

      // {
      //   "postingid":"33d61ea1",
      //   "postingDate":"Wed Feb 22 18:16:54 SGT 2023",
      //   "name":"fred",
      //   "email":"fred@gmail.com",
      //   "phone":"8765432",
      //   "title":"Post title 1",
      //   "description":"post description 1",
      //   "image":"https://bucket-one.sgp1.digitaloceanspaces.com/myobjects/b08e00d1"
      // }
      const post = result as Post
      this.postSvc.populatePostListing(post)
      
      })
      .catch((error) => {
        console.log(error);
      });
      
      this.router.navigate(['post-listing', ])
  }

  isValid() {
    return this.form.valid;
  }

  clearForm() {
    this.form.reset();
  }
  



}
