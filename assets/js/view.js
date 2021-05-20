const inquirer = require('inquirer');
const table = require('console.table');
const connection = require('../../connection');


const viewPrompt = async (cb) => {
    let viewChoice = await inquirer.prompt({
        name: 'view',
        type: 'list',
        message: 'How would you like to view the Employees?',
        choices: [
            'VIEW all employees',
            'VIEW all employees by department',
            'VIEW all employees by manager',
        ],
    })
    switch (viewChoice.view) {
        case 'VIEW all employees':
        viewAllEmployees(cb);
        break;

        case 'VIEW all employees by department':
        viewByDepartment(cb);
        break;

        case 'VIEW all employees by manager':
        viewByManager(cb);
        break;
    }
};

const viewAllEmployees = async(cb) => {
    try {
    const query = 'SELECT * FROM employees ORDER BY last_name';
    let dbResponse = await connection.query(query);
    console.table(dbResponse);
    cb();
    } catch (err) {
        throw err;
    }
};

const viewByDepartment = async(cb) => {
    try {
        const query = 'SELECT department_name AS Department, CONCAT(last_name, " ", first_name) AS Employee FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON departments.id = roles.department_id ORDER BY department_name';
        let dbResponse = await connection.query(query);
        console.table(dbResponse);
        cb();
    } catch (err) {
        throw err;
    }
};

const viewByManager = async(cb) => {
    try {
        const query = 'SELECT a.first_name AS Manager, b.first_name AS Employee FROM employees a, employees b WHERE a.id = b.manager_id ORDER BY a.first_name';
        let dbResponse = await connection.query(query);
        console.table(dbResponse);
        cb();
    } catch (err) {
        throw err;
    }
};


module.exports = {viewPrompt};