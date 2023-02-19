package day39.workshop.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import day39.workshop.server.models.MarvelCharacter;
import day39.workshop.server.services.MarvelCharacterService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;

@RestController
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins ="*")
public class MarvelCharacterController{

    @Autowired
    private MarvelCharacterService marvelCharacterSvc;

    @GetMapping(path="/characters") 
    public ResponseEntity<String> getCharacters(
        @RequestParam String nameStartsWith,
        @RequestParam(defaultValue = "20") Integer limit,
        @RequestParam(defaultValue = "0") Integer offset                                                                    
    ) {

        // get list of characters nameStartsWith
        List<MarvelCharacter> characters = marvelCharacterSvc.getCharacters(nameStartsWith, limit, offset);


        // List<MarvelCharacter> must convert to JsonArray as our client is expecting as to return a JSON Format
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

        // add each MarvelCharacter to JsonObject
        for (MarvelCharacter c : characters) {
            arrBuilder.add(c.toJson());
        }

        JsonArray resp = arrBuilder.build();

        return ResponseEntity.ok(resp.toString());
        
    
    
    }
    
}
