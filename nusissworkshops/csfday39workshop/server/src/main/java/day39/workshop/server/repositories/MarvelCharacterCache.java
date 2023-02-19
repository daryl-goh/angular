package day39.workshop.server.repositories;

import java.time.Duration;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import day39.workshop.server.models.MarvelCharacter;
@Repository
public class MarvelCharacterCache {

    @Autowired
    @Qualifier("MARVEL_CACHE")
    RedisTemplate<String, String> redisTemplate;

    public void saveCharacters(List<MarvelCharacter> characters) {

        for (MarvelCharacter c: characters) {
            redisTemplate.opsForValue()
                .set(c.getCharacterId().toString(), 
                c.toJson().toString(), // MarvelCharacter model converted to JsonObject then converted to String
                Duration.ofHours(1) // cache for 1 hour
                );
        }
    }
    
}
