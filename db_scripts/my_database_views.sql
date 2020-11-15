/* All views */
DROP VIEW IF EXISTS `InactiveOrders`;

CREATE OR REPLACE VIEW InactiveOrders AS
SELECT * 
FROM orders
WHERE is_active = 0;

/** new view **/
DROP VIEW IF EXISTS `ActiveOrders`;
CREATE OR REPLACE VIEW ActiveOrders AS
SELECT * 
FROM orders
WHERE is_active = 1;

/** new view **/
DROP VIEW IF EXISTS `PopularProducts`;
CREATE OR REPLACE VIEW PopularProducts AS
SELECT product_ID
FROM order_has
GROUP BY product_ID
ORDER BY SUM(amount) DESC;
    
