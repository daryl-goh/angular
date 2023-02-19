package day39.workshop.server.services;

import java.io.StringReader;
import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import day39.workshop.server.models.MarvelCharacter;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class MarvelAPIService {

    @Value("${MARVEL_API_PUBLIC_KEY}")
    private String publicKey;

    @Value("${MARVEL_API_PRIVATE_KEY}")
    private String privateKey;

    private static final String MARVEL_CHARACTERS_URL =
    "https://gateway.marvel.com:443/v1/public/characters";

    public List<MarvelCharacter> getCharacters(
        String nameStartsWith,
        Integer limit,
        Integer offset
    ) {

        // create authentication params and hash
        Long ts = System.currentTimeMillis(); // current timestamp
        String signature = "%d%s%s".formatted(ts, privateKey, publicKey);
        String hash = "";

        try {
            // Message digest = md5, sha1, sha512
            // Get an instance of MD5
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            // Calculate our hash
            // Update our message digest
            md5.update(signature.getBytes());
            // Get the MD5 digest
            byte[] h = md5.digest();
            // Stringify the MD5 digest
            hash = HexFormat.of().formatHex(h);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        // build the url with auth params and query params
        String url = UriComponentsBuilder.fromUriString(MARVEL_CHARACTERS_URL)
            .queryParam("ts", ts)
            .queryParam("apikey", publicKey)
            .queryParam("hash", hash)
            .queryParam("nameStartsWith", nameStartsWith)
            .queryParam("limit", limit)
            .queryParam("offset", offset)
            .toUriString();

        // create GET request
        RequestEntity req = RequestEntity
            .get(url)
            .accept(MediaType.APPLICATION_JSON)
            .build();

        // Make GET request and receive response
        RestTemplate template = new RestTemplate();
        ResponseEntity<String> resp = template.exchange(req, String.class);
        
        // Map JSON response to MarvelCharacter model
        // But it is currently in type String, so we first convert String to JsonObject

        JsonReader reader = Json.createReader(new StringReader(resp.getBody()));
        JsonObject json = reader.readObject();

        // get results JsonArray from Json
        JsonArray results = json.getJsonObject("data").getJsonArray("results");

        // map each JsonValue in "results" array into MarvelCharacter
        List<MarvelCharacter> characters = results
            .stream()
            .map(jv -> jv.asJsonObject()) // JsonValue -> JsonObject
            .map(jo -> MarvelCharacter.createFromJson(jo)) // JsonObject -> MarvelCharacter
            .toList();
        return characters;
    }     
    
}
