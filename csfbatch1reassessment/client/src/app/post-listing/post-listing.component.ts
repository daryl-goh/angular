import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-listing',
  templateUrl: './post-listing.component.html',
  styleUrls: ['./post-listing.component.css']
})
export class PostListingComponent implements OnInit, OnDestroy{

    post!: Post;
    result$!: Subscription
    constructor(private postSvc: PostService, private router: Router) {
      this.result$ = this.postSvc.onPostCreated.subscribe((result) => {
        this.post = result;
     })
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
      this.result$.unsubscribe();
    }

    cancelList() {
      this.router.navigate(['create-listing'])
    }

    submitList() {
      this.postSvc.confirmPost(this.post)
      .then((result) => {
        console.log(result);
       
        this.router.navigate(['post-confirmation', this.post.posting_id])
      })
      .catch((error) => {
        console.log(error);
        alert(error.message)
      });
    }

      
    
}
