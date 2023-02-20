package vttp2022.assessment.csf.orderbackend.controllers;

import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.services.OrderService;

@RestController
@RequestMapping(path = "/api/order")
@CrossOrigin("*")
public class OrderRestController {

  @Autowired
  private OrderService orderSvc;

  @PostMapping
  public ResponseEntity<String> postOrder(@RequestBody String payload) {

    /*
     {
    "name": "fred",
    "email": "fred@gmail.com",
    "pizza_size": 1,
    "thick_crust": true,
    "sauce": "smoky",
    "toppings": [
        "chicken", "seafood", "beef", "vegetables"
    ],
    "comments": "Solid Pizza!!!!!!"
}

{
    "name": "fred",
    "email": "fred@gmail.com",
    "pizza_size": 2,
    "thick_crust": true,
    "sauce": "classic",
    "toppings": [
        "chicken, seafood, beef, vegetables"
    ],
    "comments": "Solid Pizza!!!!!!"
}

{
    "name": "fred",
    "email": "fred@gmail.com",
    "pizza_size": 2,
    "thick_crust": true,
    "sauce": "salsa",
    "toppings": [
        "chicken, seafood, beef, vegetables"
    ],
    "comments": "Solid Pizza!!!!!!"
}
     */
    System.out.println(">>> payload: " + payload);

    // Json String to Json
    JsonReader reader = Json.createReader(new StringReader(payload));
    JsonObject json = reader.readObject();

    // Json to Object Model
    orderSvc.createOrder(Order.createFromJson(json));

    return ResponseEntity.ok("Order created successfully");
  }

  @GetMapping(path = "/{email}/all")
  public ResponseEntity<String> getOrdersbyEmail(@PathVariable String email) {  

    List<OrderSummary> orderSummary = orderSvc.getOrdersByEmail(email);

    JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

    for (OrderSummary os : orderSummary) {
      arrBuilder.add(os.toJson(os));
      
    }

    JsonArray array = arrBuilder.build();
    System.out.println(">>> array: " + array.toString());

    return ResponseEntity.ok(array.toString());
  }

}
