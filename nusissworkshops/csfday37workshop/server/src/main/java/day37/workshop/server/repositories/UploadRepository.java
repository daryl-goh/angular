package day37.workshop.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import day37.workshop.server.models.Post;

import static day37.workshop.server.repositories.Queries.*;

import java.io.ByteArrayInputStream;


@Repository
public class UploadRepository {

    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public boolean uploadImage(Post post) {
        return (
            jdbcTemplate.update(
                SQL_INSERT_INTO_TABLE, 
                post.getPostId(), 
                post.getComments(), 
                new ByteArrayInputStream(post.getPicture()) // convert byte array into input stream as you can't insert byte array directly into SQL database
        ) > 0 
    );
      


    }
}
