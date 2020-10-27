DROP SCHEMA IF EXISTS My_Database;
CREATE SCHEMA My_Database;
USE `My_Database`;

DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `cart`;

# customer/user information Table

CREATE TABLE IF NOT EXISTS `My_Database`.`users` 
(
  `email`         VARCHAR(100) NOT NULL,
  `user_password` VARCHAR(500) NOT NULL,
  `address`       VARCHAR(100) NOT NULL,
  `phone_number`  VARCHAR(40),
  `date_time`     TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (`email`)
)ENGINE = InnoDB;

# all products 

CREATE TABLE IF NOT EXISTS `My_Database`.`products` 
(
  `product_ID`         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `product_name`       VARCHAR(50) NOT NULL,
  `product_description`VARCHAR(500) NOT NULL,
  `price`              FLOAT NOT NULL,
  `quantity`           INT NOT NULL,
  PRIMARY KEY (`product_ID`)
)ENGINE = InnoDB;

# Table for who cart belongs to 

CREATE TABLE IF NOT EXISTS `My_Database`.`cart` 
(
  `cart_ID`       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `email`         VARCHAR(100) NOT NULL,
  `date_time`     TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (`cart_ID`),
  KEY `user_email_fk` (`email`),
  CONSTRAINT `user_email_fk` FOREIGN KEY (`email`) REFERENCES users (`email`) ON UPDATE CASCADE
)ENGINE = InnoDB;

# Table for items found in cart

CREATE TABLE IF NOT EXISTS `My_Database`.`cart_has` 
(
  `cart_ID`       BIGINT UNSIGNED NOT NULL,
  `product_ID`    BIGINT UNSIGNED NOT NULL,
  `amount`        INT,
  `date_time`     TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (`cart_ID`,`product_ID`)  ,
  KEY `carts_product_fk` (`product_ID`),
  KEY `carts_id_fk` (`cart_ID`),
  CONSTRAINT `carts_product_fk` FOREIGN KEY (`product_ID`) REFERENCES products (`product_ID`) ON UPDATE CASCADE,
  CONSTRAINT `carts_id_fk` FOREIGN KEY (`cart_ID`) REFERENCES cart(`cart_ID`) ON UPDATE CASCADE 
)ENGINE = InnoDB;

/*-----------------------------------------------------------------------------*/
# create a new user 

DROP PROCEDURE IF EXISTS `AddUser`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `AddUser`(IN inputEmail VARCHAR(100), 
						   IN inputPassword VARCHAR(500), 
						   IN inputPhoneNumber VARCHAR(40),
                           IN inputAddress VARCHAR (100))
BEGIN
	
   INSERT INTO `My_Database`.`users` ( `email`, `user_password`, `phone_number`, `address`) 
   VALUES ( inputEmail, inputPassword, inputPhoneNumber, inputAddress) ;
      
END $$

DELIMITER ;

/*-----------------------------------------------------------------------------*/
# create a new product

DROP PROCEDURE IF EXISTS `AddProduct`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `AddProduct`(IN inputName VARCHAR(50), 
						      IN inputDescription VARCHAR(500), 
						      IN inputPrice FLOAT,
                              IN inputQuantity VARCHAR (100))
BEGIN
	
   INSERT INTO `My_Database`.`products` ( `product_name`, `product_description`, `price`, `quantity`) 
   VALUES ( inputName, inputDescription, inputPrice, inputQuantity) ;
      
END $$

DELIMITER ;
/*-----------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS `GetUserInfo`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `GetUserInfo`(IN inputEmail VARCHAR(100))
BEGIN
	
	SELECT `email`, `address`, `phone_number` 
    FROM `users`
    WHERE email = `inputEmail`;
      
END $$

DELIMITER ;

/*-----------------------------------------------------------------------------*/
# get products

DROP PROCEDURE IF EXISTS `GetProduct`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `GetProduct`()
BEGIN

	SELECT * FROM `products`; 
    
END $$

DELIMITER ;

DROP PROCEDURE IF EXISTS `GetProduct`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `GetProduct`()
BEGIN

	SELECT * FROM `products`; 
    
END $$

DELIMITER ;

/*-----------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS `AddToCart`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `AddToCart`(IN inProductID BIGINT UNSIGNED, IN inCartID BIGINT UNSIGNED, IN inputAmount INT)
BEGIN

	INSERT INTO `My_Database`.`cart_has` (`cart_ID`,`product_ID`, `amount`) 
	VALUES (inCartID, inProductID, inputAmount);
    
END $$

DELIMITER ;

/*-----------------------------------------------------------------------------*/
# get number of products

DROP PROCEDURE IF EXISTS `NumberOfProducts`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `NumberOfProducts`(OUT total INT)
BEGIN

	SET total = My_Database.TotalProducts();
    SELECT total;
    
END $$

DELIMITER ;

/*-----------------------------------------------------------------------------*/
# get number of products

DROP PROCEDURE IF EXISTS `ProductQuantity`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `ProductQuantity`(IN inputID BIGINT UNSIGNED)
BEGIN
	
    SELECT quantity
    FROM products
    WHERE product_ID = inputID;
    
END $$

DELIMITER ;

/*-----------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS `MakeCart`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `MakeCart`(IN inputEmail VARCHAR(100))
BEGIN

   INSERT INTO `My_Database`.`cart` (`email`) 
   VALUES (inputEmail);
      
END $$

DELIMITER ;

/*-----------------------------------------------------------------------------*/

DROP FUNCTION IF EXISTS `TotalProducts`;

#*********************************************
# Helper function for total num of prodcuts  *
#*********************************************

DELIMITER $$
CREATE FUNCTION `TotalProducts` () RETURNS INT DETERMINISTIC
BEGIN

	DECLARE total INT DEFAULT 0;
    
	SELECT COUNT(product_ID) INTO total 
    FROM products;
    
	RETURN total;
    
END $$

