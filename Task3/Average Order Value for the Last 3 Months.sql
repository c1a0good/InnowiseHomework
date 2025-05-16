SELECT AVG(amount) AS avg_order_value_last_3_months
FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-03-31';