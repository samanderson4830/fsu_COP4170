DROP SCHEMA IF EXISTS My_Database;
CREATE SCHEMA My_Database;
USE `My_Database`;

# reset tables 
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `admin`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `cart`;
DROP TABLE IF EXISTS `cart_has`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `placed_order`;
DROP TABLE IF EXISTS `day_avaliable`;

# customer/user information Table
CREATE TABLE IF NOT EXISTS `My_Database`.`users` 
(
  `user_ID`       INT NOT NULL AUTO_INCREMENT UNIQUE,
  `email`         VARCHAR(100) NOT NULL,
  `user_password` VARCHAR(500) NOT NULL,
  `address`       VARCHAR(100) NOT NULL,
  `phone_number`  VARCHAR(40),
  `date_time`     TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (`email`)
)ENGINE = InnoDB;

# admin table
CREATE TABLE IF NOT EXISTS `My_Database`.`admin` 
(
  `user_ID`       INT NOT NULL AUTO_INCREMENT UNIQUE,
  `email`         VARCHAR(100) NOT NULL,
  `user_password` VARCHAR(500) NOT NULL,
  `address`       VARCHAR(100) NOT NULL,
  `ig_link`       VARCHAR(100) NOT NULL,
  `fb_link`       VARCHAR(100) NOT NULL,
  `twitter_link`  VARCHAR(100) NOT NULL,
  `about`         VARCHAR(1000) NOT NULL,
  `phone_number`  VARCHAR(40),
  `date_time`     TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (`email`)
)ENGINE = InnoDB;

# all products 
CREATE TABLE IF NOT EXISTS `My_Database`.`products` 
(
  `product_ID`         INT NOT NULL AUTO_INCREMENT UNIQUE,
  `product_name`       VARCHAR(50) NOT NULL,
  `product_description`VARCHAR(500) NOT NULL,
  `price`              FLOAT NOT NULL,
  `quantity`           INT NOT NULL,
  PRIMARY KEY (`product_ID`)
)ENGINE = InnoDB;

# Table for who cart belongs to 
CREATE TABLE IF NOT EXISTS `My_Database`.`cart` 
(
  `cart_ID`       INT NOT NULL AUTO_INCREMENT UNIQUE,
  `user_ID`       INT NOT NULL,
  `date_time`     TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (`cart_ID`,`user_ID`),
  KEY `user_ID_fk` (`user_ID`),
  CONSTRAINT `user_ID_fk` FOREIGN KEY (`user_ID`) REFERENCES users (`user_ID`) ON UPDATE CASCADE
)ENGINE = InnoDB;

# Table for items found in cart
CREATE TABLE IF NOT EXISTS `My_Database`.`cart_has` 
(
  `cart_ID`       INT NOT NULL,
  `product_ID`    INT NOT NULL,
  `amount`        INT,
  `date_time`     TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (`cart_ID`,`product_ID`)  ,
  KEY `carts_product_fk` (`product_ID`),
  KEY `carts_id_fk` (`cart_ID`),
  CONSTRAINT `carts_product_fk` FOREIGN KEY (`product_ID`) REFERENCES products (`product_ID`) ON UPDATE CASCADE,
  CONSTRAINT `carts_id_fk` FOREIGN KEY (`cart_ID`) REFERENCES cart(`cart_ID`) ON UPDATE CASCADE 
)ENGINE = InnoDB;

# days avaliable for delivery 
CREATE TABLE IF NOT EXISTS `My_Database`.`day_avaliable` 
(
  `date_time`	DATE NOT NULL, 
  `slots`       INT NOT NULL, 
  PRIMARY KEY (`date_time`)
)ENGINE = InnoDB;

# all orders, their status, and cost
CREATE TABLE IF NOT EXISTS `My_Database`.`orders` 
(
  `order_ID`       INT NOT NULL AUTO_INCREMENT UNIQUE,
  `total_cost`     FLOAT NOT NULL,
  `is_active`      BOOL NOT NULL,
  `date_time`      DATE NOT NULL, 
  PRIMARY KEY (`order_ID`, `date_time`),
  KEY `date_fk` (`date_time`),
  CONSTRAINT `date_fk` FOREIGN KEY (`date_time`) REFERENCES day_avaliable (`date_time`) ON UPDATE CASCADE
)ENGINE = InnoDB;

# who placed an order
CREATE TABLE IF NOT EXISTS `My_Database`.`placed_order` 
(
  `order_ID`       INT NOT NULL,
  `user_ID`        INT NOT NULL, 
  PRIMARY KEY (`order_ID`,`user_ID`),
  KEY `order_ID_fk` (`order_ID`),
  KEY `user_fk` (`user_ID`),
  CONSTRAINT `user_fk` FOREIGN KEY (`user_ID`) REFERENCES users (`user_ID`) ON UPDATE CASCADE,
  CONSTRAINT `order_ID_fk` FOREIGN KEY (`order_ID`) REFERENCES orders(`order_ID`) ON UPDATE CASCADE 
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
# create a admin user
DROP PROCEDURE IF EXISTS `AddAdmin`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `AddAdmin`(IN input_email VARCHAR(100), 
						    IN input_password VARCHAR(500), 
						    IN input_phone_number VARCHAR(40),
                            IN input_address VARCHAR (100),
						    IN input_ig_link VARCHAR(100),
						    IN input_fb_link  VARCHAR(100),
			                IN input_twitter_link  VARCHAR(100),
						    IN input_about VARCHAR(1000))
BEGIN
	
   INSERT INTO `My_Database`.`admin` ( `email`, `user_password`, `phone_number`, `address`,`ig_link`,`fb_link`,`twitter_link`, `about`) 
   VALUES (input_email, input_password, input_phone_number, input_address, input_ig_link, input_fb_link, input_twitter_link, input_about);
      
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
	
	SELECT `user_ID`,`email`, `address`, `phone_number` 
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

/*-----------------------------------------------------------------------------*/
DROP PROCEDURE IF EXISTS `AddToCart`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `AddToCart`(IN inProductID INT, IN inCartID INT, IN inputAmount INT)
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
CREATE PROCEDURE `ProductQuantity`(IN inputID INT)
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
CREATE PROCEDURE `MakeCart`(IN inputUserID INT)
BEGIN

   INSERT INTO `My_Database`.`cart` (`user_ID`) 
   VALUES (inputUserID);
      
END $$

DELIMITER ;

/*-----------------------------------------------------------------------------*/
DROP PROCEDURE IF EXISTS `AddDay`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `AddDay`(IN inputDay DATE, IN inputSlots INT)
BEGIN

   INSERT INTO `My_Database`.`day_avaliable` (`date_time`, `slots`) 
   VALUES (inputDay, inputSlots);
      
END $$

DELIMITER ;

/*-----------------------------------------------------------------------------*/
DROP PROCEDURE IF EXISTS `AddOrder`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `AddOrder`(IN inputDay DATE, IN inputCost FLOAT)
BEGIN

   INSERT INTO `My_Database`.`orders` (`date_time`, `total_cost`, `is_active`) 
   VALUES (inputDay, inputCost, true);
      
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


