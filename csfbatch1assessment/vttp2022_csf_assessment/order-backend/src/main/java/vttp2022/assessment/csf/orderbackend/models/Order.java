package vttp2022.assessment.csf.orderbackend.models;

import java.util.LinkedList;
import java.util.List;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

// IMPORTANT: You can add to this class, but you cannot delete its original content

public class Order {

	private Integer orderId;
	private String name;
	private String email;
	private Integer size;
	private String sauce;
	private Boolean thickCrust;
	private List<String> toppings = new LinkedList<>();
	private String comments;

	public void setOrderId(Integer orderId) { this.orderId = orderId; }
	public Integer getOrderId() { return this.orderId; }

	public void setName(String name) { this.name = name; }
	public String getName() { return this.name; }

	public void setEmail(String email) { this.email = email; }
	public String getEmail() { return this.email; }

	public void setSize(Integer size) { this.size = size; }
	public Integer getSize() { return this.size; }

	public void setSauce(String sauce) { this.sauce = sauce; }
	public String getSauce() { return this.sauce; }

	public void setThickCrust(Boolean thickCrust) { this.thickCrust = thickCrust; }
	public Boolean isThickCrust() { return this.thickCrust; }

	public void setToppings(List<String> toppings) { this.toppings = toppings; }
	public List<String> getToppings() { return this.toppings; }
	public void addTopping(String topping) { this.toppings.add(topping); }

	public void setComments(String comments) { this.comments = comments; }
	public String getComments() { return this.comments; }


	/*
	 * payload: {"name":"Fred","email":"fred@gmail.com","size":1,
	 * "base":false,"sauce":"signature","toppings":["chicken","cheese"],"comments":"gehehe"}
	 */
	public static Order createFromJson(JsonObject jo) {
		Order o = new Order();
		o.setName(jo.getString("name"));
		o.setEmail(jo.getString("email"));
		o.setSize(jo.getInt("size"));
		o.setSauce(jo.getString("sauce"));
		o.setThickCrust(jo.getBoolean("base"));
		o.setComments(jo.getString("comments"));

		// toppings is an array of strings
		jo.getJsonArray("toppings")
			.forEach(jv -> o.addTopping(jv.toString()));

		return o;
	}

	public static Order createFromSQL(SqlRowSet rs) {
		Order o = new Order();
		o.setOrderId(rs.getInt("order_id"));
		o.setName(rs.getString("name"));
		o.setEmail(rs.getString("email"));
		o.setSize(rs.getInt("pizza_size"));
		o.setSauce(rs.getString("sauce"));
		o.setThickCrust(rs.getBoolean("thick_crust"));
		o.setComments(rs.getString("comments"));

		// toppings is a comma-separated string
		String[] toppings = rs.getString("toppings").split(",");
		for (String topping : toppings) {
			o.addTopping(topping);
		}

		return o;
	}

	public JsonObject toJson() {
		JsonObjectBuilder job = Json
			.createObjectBuilder()
			.add("order_id", this.orderId)
			.add("name", this.name)
			.add("email", this.email)
			.add("pizza_size", this.size)
			.add("sauce", this.sauce)
			.add("thick_crust", this.thickCrust)
			.add("comments", this.comments);

		JsonArrayBuilder jab = Json.createArrayBuilder();
		for (String topping : this.toppings) {
			jab.add(topping);
		}



		return job.add("toppings", jab).build();
	}


	@Override
	public String toString() {
		return "Order [orderId=" + orderId + ", name=" + name + ", email=" + email + ", size=" + size + ", sauce=" + sauce
				+ ", thickCrust=" + thickCrust + ", toppings=" + toppings + ", comments=" + comments + "]";
	}

	
}
