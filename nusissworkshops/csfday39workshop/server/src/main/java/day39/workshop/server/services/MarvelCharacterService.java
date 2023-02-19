package day39.workshop.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import day39.workshop.server.models.MarvelCharacter;
import day39.workshop.server.repositories.MarvelCharacterCache;

@Service
public class MarvelCharacterService {
    
    @Autowired
    private MarvelAPIService marvelAPISvc;

    @Autowired
    private MarvelCharacterCache marvelCharacterCache;

    public List<MarvelCharacter> getCharacters(
        String nameStartsWith,
        Integer limit,
        Integer offset
    ) {
        // retrieve characters from Marvel API
        List<MarvelCharacter> characters = marvelAPISvc.getCharacters(nameStartsWith, limit, offset);

        // cache results in redis
        marvelCharacterCache.saveCharacters(characters);
        return characters;
    }   
    
}
