package day39.workshop.server.models;

import jakarta.json.Json;
import jakarta.json.JsonObject;

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

    public JsonObject toJson() {
        return Json
            .createObjectBuilder()
            .add("characterId", characterId)
            .add("name", name)
            .add("description", description)
            .add("imagePath", imagePath)
            .build();
    }

    
}
