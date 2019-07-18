DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("MacBook Pro", "Electronics", 1500, 4),
("Dell PC", "Electronics", 500, 5),
("45 lb Kettlebell", "Sporting Goods", 45, 2),
("Sleeping Bag", "Sporting Goods", 20, 4),
("Frying Pan", "Cooking", 45, 2),
("Sony Mirrorless Digital Camera", "Camera & Photo", 45, 2),
("Nikon Digital DSLR", "Camera & Photo", 45, 2),
("Small Chef's Knife", "Cooking", 40, 5),
("Pearl 5-Piece Drum Set", "Musical Instruments", 495, 2),
("Yamaha 88-Key Weighted Action Digital Piano", "Musical Instruments", 400, 3);

