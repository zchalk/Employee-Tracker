CREATE DATABASE employee_recordsdb;

USE employee_recordsdb;

CREATE TABLE departments (
 id INT NOT NULL AUTO_INCREMENT,
 department_name VARCHAR(30),
 PRIMARY KEY (id)
);
CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER(10),
PRIMARY KEY (id)
);
CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER(10),
manager_id INTEGER(10) NULL,
PRIMARY KEY (id)
);
