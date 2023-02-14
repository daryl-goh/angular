package sg.edu.nus.iss.fileupload.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import sg.edu.nus.iss.fileupload.server.services.S3Service;

public class FileUploadController {

    @Autowired
    private S3Service s3svc;

    @PostMapping(path="/upload", 
        consumes=MediaType.MULTIPART_FORM_DATA_VALUE, 
        produces=MediaType.APPLICATION_JSON_VALUE) 
    @ResponseBody
    @CrossOrigin()
    public ResponseEntity<String> postUploadFromAngular(
        @RequestPart MultipartFile myImage,
        @RequestPart String title,
        @RequestPart String complain) {

            
        }
    )
    
    
    
}
