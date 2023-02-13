package vttp2022.csf.day38.server.models;

import org.bson.Document;

import jakarta.json.JsonObject;

public class Task {

    private String task;
    private int priority;
    private long dueDate;

    public String getTask() {
        return task;
    }
    public void setTask(String task) {
        this.task = task;
    }
    public int getPriority() {
        return priority;
    }
    public void setPriority(int priority) {
        this.priority = priority;
    }
    public long getDueDate() {
        return dueDate;
    }
    public void setDueDate(long dueDate) {
        this.dueDate = dueDate;
    }

    public static Task create(JsonObject json) {
        Task task = new Task();
        task.setTask(json.getString("task"));
        task.setPriority(json.getInt("priority"));
        task.setDueDate(json.getJsonNumber("dueDate").longValue());
        return task;
    }


    public Document asBsonDocument() {
        Document document = new Document();
        document.put("task", task);
        document.put("priority", priority);
        document.put("dueDate", dueDate);
        return document;

    }

    
    
}
