import { Injectable } from "@angular/core";

@Injectable()
export class CameraService {

    imageData = ""

    constructor(private http: HttpClient) { }
    
}