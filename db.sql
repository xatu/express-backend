CREATE DATABASE IF NOT EXISTS test_rafael;
USE test_rafael;

CREATE TABLE products(
id			int(255) auto_increment not null,
name 		varchar(255),
description text,
price		varchar(255),
image		varchar(255),
CONSTRAINT pk_products PRIMARY KEY(id)
)ENGINE=InnoDb;