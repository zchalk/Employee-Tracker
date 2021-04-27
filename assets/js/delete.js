const inquirer = require('inquirer');

const deletePrompt = async () => {
    let deleteChoice = await inquirer.prompt({
        name: 'update',
        type: 'list',
        message: "What would you like to DELETE?",
        choices: [
            'DELETE employee',
            'DELETE role',
            'DELETE department',
        ],
    })
    switch (deleteChoice) {
        case 'DELETE employee':
        deleteEmployee();
        break;

        case 'DELETE role':
        deleteRole();
        break;

        case 'DELETE department':
        deleteDepartment();
        break;
    }
};
//redundancy
const getEmployees = async() => {
    var currentEmployees = [];
    var query = 'SELECT last_name, first_name, id FROM employees ORDER BY id'
    try {
        let results = await connection.query(query);
        results.forEach( result => currentEmployees.push(result.last_name));
        return currentEmployees;
    } catch (err) {
        if (err) throw err;
    }
};
const getDepartments = async() => {
    // double check this will empty array everytime or do i even need it, is results an array already?
    var currentDepartments = [];
    var query = 'SELECT department_name, id FROM departments ORDER BY id';
    try {
    let results = await connection.query(query);
    //how to push both name and id
    results.forEach(result => currentDepartments.push(result.last_name));
    return currentDepartments;
    } catch (err) {
        if (err) throw err;
    }
};
const getRoles = async() => {
    var currentRoles = [];
    var query = 'SELECT title, id FROM roles ORDER BY id';
    try {
        let results = await connection.query(query);
        //how to push both first and last
        results.forEach(result => currentRoles.push(result.last_name));
        return currentRoles;
    } catch (err) {
            if (err) throw err;
    }
};

const  deleteEmployee = async () => {
    var query = 'DELETE FROM employees WHERE id = ?';
    try {
        let deletedEmployeeInfo = await inquirer.prompt({
            name: 'employee',
            type: 'rawlist',
            choices: getEmployees(),
            message: 'Which Employee would you like to delete?'
        });
        const employeeChoice = getEmployees().indexOf(deletedEmployeeInfo.employee) + 1;
        await connection.query(query, employeeChoice);
    } catch (err) {
        if (err) throw err;
    }
};
const  deleteRole = async () => {
    var query = 'DELETE FROM roles WHERE id = ?';
    try {
        let deletedRoleInfo = await inquirer.prompt({
            name: 'role',
            type: 'rawlist',
            choices: getRoles(),
            message: 'Which Role would you like to delete?'
        });
        const roleChoice = getRoles().indexOf(deletedRoleInfo.role) + 1;
        await connection.query(query, roleChoice);
    } catch (err) {
        if (err) throw err;
    }
};
const  deleteDepartment = async () => {
    var query = 'DELETE FROM departments WHERE id = ?';
    try {
        let deletedDepartmentInfo = await inquirer.prompt({
            name: 'department',
            type: 'rawlist',
            choices: getDepartments(),
            message: 'Which Department would you like to delete?'
        });
        const departmentChoice = getDepartments().indexOf(deletedDepartmentInfo.department) + 1;
        await connection.query(query, departmentChoice);
    } catch (err) {
        if (err) throw err;
    }
};

module.exports = {deletePrompt, getEmployees, getDepartments, getRoles, deleteEmployee, deleteRole, deleteDepartment}