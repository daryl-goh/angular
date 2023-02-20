package vttp2022.assessment.csf.orderbackend.services;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.repositories.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private PricingService priceSvc;

	@Autowired
	private OrderRepository orderRepo;

	// POST /api/order
	// Create a new order by inserting into orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public Boolean createOrder(Order order) {

		System.out.println(order);

		return orderRepo.createOrder(order);

	}

	// GET /api/order/<email>/all
	// Get a list of orders for email from orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public List<OrderSummary> getOrdersByEmail(String email) {
		List<Order> orders = orderRepo.getOrdersByEmail(email);

		List<OrderSummary> orderSummaries = new LinkedList<>();
		// Loop through list or orders
		for (Order order : orders) {
			System.out.println(order);
			
			OrderSummary os = new OrderSummary();
			os.setOrderId(order.getOrderId());
			os.setName(order.getName());
			os.setEmail(email);

			// Use priceSvc to calculate the total cost of an order
			float total = 0f;
			// for each order, calculate price for size
			total += priceSvc.size(order.getSize());
			System.out.println("size: " + total);

			// for each order, calculate price for sauce
			total += priceSvc.sauce(order.getSauce());
			System.out.println("sauce: " + total);

			// for each order, calculate price for toppings
			for (String topping : order.getToppings()) {
				
				topping = topping.replace("[", "");
				topping = topping.replace("]", "");
				topping = topping.replace(" ", "");
				topping = topping.replace("\"", "");
				System.out.println(">>>>LOOP: " + topping);
				total += priceSvc.topping(topping);
				System.out.println(">>>>TOTAL: " + total);


			}
			// total += priceSvc.topping(order.getToppings().toString());
			// System.out.println("toppings: " + total);
			// System.out.println("topping: " + order.getToppings().toString());

			// for each order, calculate price for thick/thin crust
			if (order.isThickCrust()) {
				total += priceSvc.thickCrust();
			} else {
				total += priceSvc.thinCrust();
			}

			System.out.println("TOTAL OF TOTAL: " + total);
			os.setAmount(total);
			orderSummaries.add(os);
		}
		return orderSummaries;
	}

}
