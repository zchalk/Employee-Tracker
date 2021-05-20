USE employee_recordsdb;

INSERT INTO departments (department_name)
VALUES ("Managment"), ("Front of House"), ("Back of House") 

USE employee_recordsdb;

INSERT INTO roles (title, salary, dept_id)
VALUES ("Partner", 150000, 1),("Manager", 40000, 1),("Key", 15) 1), ("Host", 4, 2), ("Server", 2, 2), ("Grill", 10, 3), ("Saute", 9, 3), ("Fry", 8, 3), ("Salad", 7, 3) 

USE employee_recordsdb;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Brittani", "K", 1, null), ("Rachel", "J", 2, 1), ("Phyllis", "S", 3, 2), ("Waylon", "T", 4, 3), ("Jordan", "R", 5, 3), ("Rashaad", "A", 5, 3), ("Lawrence", "C", 6, 2), ("Matt", "M", 7, 2), ("CeeCee", "H", 8, 2), ("Tyree", "H", 9, 2)