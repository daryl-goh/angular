package vttp2022.assessment.csf.orderbackend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import vttp2022.assessment.csf.orderbackend.models.Order;

import static vttp2022.assessment.csf.orderbackend.repositories.Queries.*;

import java.util.LinkedList;
import java.util.List;

@Repository
public class OrderRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Boolean createOrder(Order order) {
        
        return jdbcTemplate.update(SQL_INSERT_ORDER, order.getName(), order.getEmail(), order.getSize(), order.isThickCrust(), order.getSauce(), order.getToppings().toString(), order.getComments()) > 0;
       
    }

    public List<Order> getOrdersByEmail(String email) {
        
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_GET_ORDERS_BY_EMAIL, email);
        
        List<Order> orders = new LinkedList<>();
        
        while (rs.next()) {
            orders.add(Order.createFromSQL(rs));
        }

        return orders;

        
    }

    
}
