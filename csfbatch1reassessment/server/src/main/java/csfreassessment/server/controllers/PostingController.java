package csfreassessment.server.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping(path="/api", produces=MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
@CrossOrigin("*")
public class PostingController {
    

    @PostMapping(path="/createpost")
    public ResponseEntity<String> createPost
        (@RequestPart String name, 
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

            return null;
        }
}
