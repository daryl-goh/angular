package vttp2022.csf.day38.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp2022.csf.day38.server.models.Task;
import vttp2022.csf.day38.server.repositories.ToDoRepository;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository todoRepo;

    public void addTasks(List<Task> tasks) {
        todoRepo.add(tasks);
    }
    
}
