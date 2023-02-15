import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";

@Injectable()
export class PostService {
    constructor(private httpClient: HttpClient) {}

    createPost(comments: string, picture: File) {
        // construct form data
        const formData = new FormData();
        formData.set('picture', picture);
        formData.set('comments', comments);

        // make POST request to server
        return lastValueFrom(this.httpClient.post('/api/post', formData));
    }
}