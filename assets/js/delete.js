const inquirer = require('inquirer');
const connection = require('../../connection');
const {getDepartments, getRoles, getEmployees} = require('./get');

const deletePrompt = async (cb) => {
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
    switch (deleteChoice.update) {
        case 'DELETE employee':
        deleteEmployee(cb);
        break;

        case 'DELETE role':
        deleteRole(cb);
        break;

        case 'DELETE department':
        deleteDepartment(cb);
        break;
    }
};

const  deleteEmployee = async (cb) => {
    const employees = await getEmployees();
    var query = 'DELETE FROM employees WHERE id = ?';
    try {
        let deletedEmployeeInfo = await inquirer.prompt({
            name: 'employee',
            type: 'list',
            choices: employees.map(employee => employee.first_name),
            message: 'Which Employee would you like to delete?'
        });
        let employeeChoice = employees.filter(employee => employee.first_name == deletedEmployeeInfo.employee);
        await connection.query(query, employeeChoice[0].id);
        cb();
    } catch (err) {
        if (err) throw err;
    }
};
const  deleteRole = async (cb) => {
    const roles = await getRoles();
    var query = 'DELETE FROM roles WHERE id = ?';
    try {
        let deletedRoleInfo = await inquirer.prompt({
            name: 'role',
            type: 'list',
            choices: roles.map(role => role.title),
            message: 'Which Role would you like to delete?'
        });
        let roleChoice = roles.filter(role => role.title == deletedRoleInfo.role);
        await connection.query(query, roleChoice[0].id);
        cb();
    } catch (err) {
        if (err) throw err;
    }
};
const  deleteDepartment = async (cb) => {
    const departments = await getDepartments();
    var query = 'DELETE FROM departments WHERE id = ?';
    try {
        let deletedDepartmentInfo = await inquirer.prompt({
            name: 'department',
            type: 'list',
            choices: departments.map(department => department.department_name),
            message: 'Which Department would you like to delete?'
        });
        let departmentChoice = departments.filter(department => department.department_name == deletedDepartmentInfo.department);
        await connection.query(query, departmentChoice[0].id);
        cb();
    } catch (err) {
        if (err) throw err;
    }
};

module.exports = {deletePrompt};