/* All views */
DROP VIEW IF EXISTS `InactiveOrders`;

CREATE  OR REPLACE VIEW InactiveOrders AS
SELECT * 
FROM orders
WHERE is_active = 0;

/** new view **/
DROP VIEW IF EXISTS `ActiveOrders`;
CREATE  OR REPLACE VIEW ActiveOrders AS
SELECT * 
FROM orders
WHERE is_active = 1;
