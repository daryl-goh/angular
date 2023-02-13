package vttp2022.csf.day38.server.controllers;

import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp2022.csf.day38.server.models.Task;
import vttp2022.csf.day38.server.services.ToDoService;

@Controller
@RequestMapping(path="/api/")
public class TaskController {

    @Autowired
    private ToDoService toDoSvc;
    
    @PostMapping(path="/tasks")
    @ResponseBody
    public ResponseEntity<String> postTask(@RequestBody String payload) {
        
        JsonReader reader =  Json.createReader(new StringReader(payload));
        JsonArray jsonArr = reader.readArray();

        List<Task> tasks = jsonArr.stream()
            .map(v -> v.asJsonObject())
            .map(v -> Task.create(v))
            .toList();
        
        toDoSvc.addTasks(tasks);

        JsonObject response = Json.createObjectBuilder()
            .add("insertCount", tasks.size())
            .build();
        
        return ResponseEntity.ok(response.toString());
        
    }
    
}
