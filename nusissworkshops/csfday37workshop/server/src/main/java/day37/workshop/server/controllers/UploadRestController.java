package day37.workshop.server.controllers;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import day37.workshop.server.models.Post;
import day37.workshop.server.services.UploadService;
import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping(path="/api")
public class UploadRestController {

    @Autowired
    private UploadService uploadSvc;

    @PostMapping(path="/post", consumes=MediaType.MULTIPART_FORM_DATA_VALUE, produces=MediaType.APPLICATION_JSON_VALUE) //
    public ResponseEntity<String> uploadImage (@RequestPart String comments, @RequestPart MultipartFile picture ) throws IOException {

        // map request body to Post object
        Post post = new Post(); // create new post object
        post.setPostId(UUID.randomUUID().toString().substring(0, 8)); // generate random post id
        post.setComments(comments); // set comments
        post.setPicture(picture.getBytes()); // convert multipart file into byte array

        // call service to upload image to save post to database
        if (uploadSvc.uploadImage(post)) { // if upload is successful
            JsonObject resp = Json // return success message
                .createObjectBuilder() // create json object
                .add("message", "post %s File uploaded successfully".formatted(post.getPostId())) // add message
                .build(); // build json object

            return ResponseEntity.ok(resp.toString()); // return json object as string
        } else { // if upload is not successful
            JsonObject err = Json // return error message
                .createObjectBuilder()  // create json object
                .add("message", "File upload failed") // add message
                .build(); // build json object

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err.toString()); // return json object as string
        }


     

        

        // return ResponseEntity.ok("File uploaded successfully");
    }
}
