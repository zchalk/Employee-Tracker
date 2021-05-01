const inquirer = require('inquirer');
const table = require('console.table');
const connection = require('../../connection');
//why is table not called?
// add connection export?



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
        const query = 'SELECT department_name, CONCAT(last_name, " ", first_name) AS employee_name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON departments.id = roles.department_id ORDER BY department_name';
        let dbResponse = await connection.query(query);
        console.table(dbResponse);
        cb();
    } catch (err) {
        throw err;
    }
};

const viewByManager = async(cb) => {
    try {
        // I dont understand how to make this query
        const query = '';
        let dbResponse = await connection.query(query);
        console.table(dbResponse);
        cb();
    } catch (err) {
        throw err;
    }
};


module.exports = {viewPrompt, viewAllEmployees, viewByDepartment, viewByManager};