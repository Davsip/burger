CREATE DATABASE burgers_db;
USE burgers_db;

-- Create the table tasks.
CREATE TABLE burgers
(
id int NOT NULL AUTO_INCREMENT,
buger_name varchar(255) NOT NULL,
devoured TINYINT NOT NULL default 0;
PRIMARY KEY (id)
);
