DROP SCHEMA IF EXISTS my_db;
CREATE SCHEMA my_db;
USE `My_Database`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `My_Database`.`users` 
(
  `user_ID`       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `email`         VARCHAR(100) NOT NULL,
  `user_password` VARCHAR(500) NOT NULL,
  `address`       VARCHAR(100) NOT NULL,
  `phone_number`  VARCHAR(40),
  `date_time`     TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (`user_ID`),
  UNIQUE INDEX `user_ID_UNIQUE` (`user_ID` ASC)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS `products`;

CREATE TABLE IF NOT EXISTS `My_Database`.`products` 
(
  `product_ID`         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `product_name`       VARCHAR(50) NOT NULL,
  `product_description`VARCHAR(500) NOT NULL,
  `price`              FLOAT NOT NULL,
  `quantity`           INT NOT NULL,
  PRIMARY KEY (`product_ID`),
  UNIQUE INDEX `product_ID_UNIQUE` (`product_ID` ASC)
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
# get products

DROP PROCEDURE IF EXISTS `GetProduct`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `GetProduct`()
BEGIN
	SELECT * FROM `products` ;     
END $$

DELIMITER ;
/*-----------------------------------------------------------------------------*/
# get products

DROP PROCEDURE IF EXISTS `ChangeEmail`;

DELIMITER $$
USE `My_Database`$$
CREATE PROCEDURE `ChangeEmail`(IN inputEmail VARCHAR(100), IN oldEmail VARCHAR(100) )
BEGIN
	# turn off safe update mode
	SET SQL_SAFE_UPDATES = 0;
    
	UPDATE `users`
	SET email = inputEmail
	WHERE oldEmail = email;
    
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

