package csfreassessment.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import csfreassessment.server.models.Post;

import static csfreassessment.server.repositories.Queries.*;

@Repository
public class PostRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Boolean savePost(Post post) {
        System.out.println(">>> PostRepository.savePost(): " + post);
        return jdbcTemplate.update(SQL_INSERT_INTO_POSTINGS, 
            post.getPosting_id(),
            post.getPosting_date(),
            post.getName(),
            post.getEmail(),
            post.getPhone(),
            post.getTitle(),
            post.getDescription(),
            post.getImage()
        ) > 0;
    }
}
