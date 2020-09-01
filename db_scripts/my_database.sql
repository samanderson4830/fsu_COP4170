DROP SCHEMA IF EXISTS My_Database;
CREATE SCHEMA My_Database;
USE `My_Database`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `My_Database`.`users` 
(
  `user_ID`       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `email`         VARCHAR(100) NOT NULL,
  `user_password` VARCHAR(500) NOT NULL,
  `address`         VARCHAR(100) NOT NULL,
  `phone_number`  VARCHAR(40),
  `date_time`     TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (`user_ID`),
  UNIQUE INDEX `user_ID_UNIQUE` (`user_ID` ASC)
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
