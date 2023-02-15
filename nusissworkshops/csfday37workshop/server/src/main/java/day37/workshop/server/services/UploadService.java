package day37.workshop.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import day37.workshop.server.models.Post;
import day37.workshop.server.repositories.UploadRepository;

@Service
public class UploadService {

    @Autowired
    private UploadRepository uploadRepository;
    
    public boolean uploadImage(Post post) {
        return uploadRepository.uploadImage(post);
        
    }

    
}
