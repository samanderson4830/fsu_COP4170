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
	
   INSERT INTO `My_Database`.`users` ( `email`, `user_password`, `phone_number`, `quantity`) 
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


