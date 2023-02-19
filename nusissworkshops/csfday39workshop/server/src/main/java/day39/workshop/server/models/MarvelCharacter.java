package day39.workshop.server.models;

import java.util.List;



import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class MarvelCharacter {


    /*
     *   
        "results": [
        {
            "id": 1009281,
            "name": "Doctor Doom",
            "description": "",
            "modified": "2016-06-22T12:07:32-0400",
            "thumbnail": {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/3/60/53176bb096d17",
                "extension": "jpg"
            }
     */


    Integer characterId;
    String name;
    String description;
    String imagePath;
    List<String> comments;
    
    public List<String> getComments() {
        return comments;
    }
    public void setComments(List<String> comments) {
        this.comments = comments;
    }

    public Integer getCharacterId() {
        return characterId;
    }
    public void setCharacterId(Integer characterId) {
        this.characterId = characterId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getImagePath() {
        return imagePath;
    }
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    // JsonObject from MARVEL API (original json format) convert to MarvelCharacter
    public static MarvelCharacter createFromJson(JsonObject json) {

        MarvelCharacter c = new MarvelCharacter();
        c.setCharacterId(json.getInt("id"));
        c.setName(json.getString("name"));
        c.setDescription(json.getString("description"));

        JsonObject thumbnail = json.getJsonObject("thumbnail");
        String path = thumbnail.getString("path");
        String extension = thumbnail.getString("extension");

        c.setImagePath("%s.%s".formatted(path, extension)); // {path}.{extension}

        return c;
    }

    // JsonObject from REDIS (stored as key value) convert to MarvelCharacter
    public static MarvelCharacter createFromCache(JsonObject json) {
        
        MarvelCharacter c = new MarvelCharacter();
        c.setCharacterId(json.getInt("characterId"));
        c.setName(json.getString("name"));
        c.setDescription(json.getString("description"));
        c.setImagePath(json.getString("imagePath"));
  
        return c;
    }

    public JsonObject toJson() {
        JsonObjectBuilder job = Json
          .createObjectBuilder()
          .add("characterId", characterId)
          .add("name", name)
          .add("description", description)
          .add("imagePath", imagePath);
    
        // create JsonArray of comments if comments is not null
        if (comments != null) {
          JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
          comments.forEach(c -> arrBuilder.add(c));
          JsonArray commentsArray = arrBuilder.build();
          job.add("comments", commentsArray);
        }
    
        return job.build();
      }
    
}
