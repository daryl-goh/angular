package csfreassessment.server.repositories;

import java.io.StringReader;
import java.time.Duration;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import csfreassessment.server.models.Post;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Repository
public class PostCacheRepository {

    @Autowired
    @Qualifier("POST_CACHE")
    RedisTemplate<String, String> redisTemplate;

    public void savePost(Post post) {
        redisTemplate
            .opsForValue().set(
            post.getPosting_id(), 
            post.toJson().toString()
            ,Duration.ofMinutes(15));
    }

    public Boolean getPost(String id) {
       String value = redisTemplate.opsForValue().get(id);
    
        if (value == null) {
            return false;
        } else {
            redisTemplate.delete(id);
            return true;
        }

        }
    


    
    
}
