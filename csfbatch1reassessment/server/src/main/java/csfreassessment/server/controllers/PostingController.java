package csfreassessment.server.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import csfreassessment.server.models.Post;
import csfreassessment.server.services.PostService;
import csfreassessment.server.services.S3Service;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

import java.io.IOException;
import java.io.StringReader;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin("*")
public class PostingController {

    @Autowired
    private PostService postSvc;

    // for Image upload to Digital Ocean
    @Autowired
    private S3Service s3Svc;

    @PostMapping(path = "/posting", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createPost(@RequestPart String name,
            @RequestPart String email,
            @RequestPart String phone,
            @RequestPart String title,
            @RequestPart String description,
            @RequestPart MultipartFile image) {

        System.out.println("name: " + name);
        System.out.println("email: " + email);
        System.out.println("phone: " + phone);
        System.out.println("title: " + title);
        System.out.println("description: " + description);
        System.out.println("image: " + image);

        Post post = new Post();
        post.setPosting_id(UUID.randomUUID().toString().substring(0, 8));
        post.setPosting_date(new Date());
        post.setName(name);
        post.setEmail(email);
        post.setPhone(phone);
        post.setTitle(title);
        post.setDescription(description);

        String key = "";

        try {

            key = s3Svc.upload(image);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        String objectUrl = "https://bucket-one.sgp1.digitaloceanspaces.com/myobjects/" + key;

        post.setImage(objectUrl);
        
        // save to redis
        postSvc.saveInCacheAndS3(post);

  
        
        JsonObject resp = Json
            .createObjectBuilder()
            .add("posting_id", post.getPosting_id())
            .add("posting_date", post.getPosting_date().toString())
            .add("name", post.getName())
            .add("email", post.getEmail())
            .add("phone", post.getPhone())
            .add("title", post.getTitle())
            .add("description", post.getDescription())
            .add("image", post.getImage())
            .build();
        return ResponseEntity.ok(resp.toString());
        } 



    @PutMapping(path="/posting/{posting_id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> confirmPost(@PathVariable String posting_id
    , @RequestBody String body) {

        JsonReader reader = Json.createReader(new StringReader(body));
        JsonObject json = reader.readObject();
        String postingId = json.getString("posting_id");
        Date postingDate = new Date();
        String name = json.getString("name");
        String email = json.getString("email");
        String phone = json.getString("phone");
        String title = json.getString("title");
        String description = json.getString("description");
        String image = json.getString("image");

        
        

        // if post exists in redis, save to sql
        if (postSvc.getPost(posting_id)) {
            
            Post post = new Post();
            post.setPosting_id(postingId);
            post.setPosting_date(postingDate);
            post.setName(name);
            post.setEmail(email);
            post.setPhone(phone);
            post.setTitle(title);
            post.setDescription(description);
            post.setImage(image);

            postSvc.saveInSQL(post);
            
            // create response body
            JsonObject resp = Json
            .createObjectBuilder()
            .add("message", "Accepted " + posting_id)
            .build();

            return ResponseEntity.ok(resp.toString());

        } else {
            JsonObject err = Json
            .createObjectBuilder()
            .add("message", "Posting ID " + posting_id + " not found")
            .build();

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.toString());
        }
     
    }
       
    }
