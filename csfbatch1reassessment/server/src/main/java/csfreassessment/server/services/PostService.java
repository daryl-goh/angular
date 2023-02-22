package csfreassessment.server.services;

import java.io.IOException;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import csfreassessment.server.models.Post;
import csfreassessment.server.repositories.PostCacheRepository;
import csfreassessment.server.repositories.PostRepository;

@Service
public class PostService {

  
    // for saving to Redis
    @Autowired
    private PostCacheRepository postCacheRepo;

    // for saving to MySQL
    @Autowired
    private PostRepository postRepo;

    public void saveInCacheAndS3(Post post) {
       postCacheRepo.savePost(post);
            
    }

    public void saveInSQL(Post post) {
        System.out.println(">>> PostService.saveInSQL(): " + post);
        postRepo.savePost(post);
    }

    public Boolean getPost(String id) {
        return postCacheRepo.getPost(id);
    }
    
}
