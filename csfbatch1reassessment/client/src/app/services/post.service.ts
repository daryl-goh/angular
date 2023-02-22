import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { lastValueFrom, Subject } from 'rxjs';
import { Post } from '../post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  onPostCreated: Subject<Post> = new Subject<Post>();
  
  constructor(private httpClient: HttpClient) { }

  createPost(form: FormGroup): Promise<any>{
    // construct form data
    const formData = new FormData();
    formData.set('name', form.get('name')?.value);
    formData.set('email', form.get('email')?.value);
    formData.set('phone', form.get('phone')?.value);
    formData.set('title', form.get('title')?.value);
    formData.set('description', form.get('description')?.value);
    formData.set('image', form.get('image')?.value);

    // make POST request to server
    return lastValueFrom(this.httpClient.post('/api/posting', formData));

  }

  populatePostListing(post: Post) {
    this.onPostCreated.next(post)
  }

  confirmPost(postListing: Post) {
    return lastValueFrom(this.httpClient.put(`/api/posting/${postListing.posting_id}`, postListing));
  }
}
