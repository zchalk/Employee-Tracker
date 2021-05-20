const inquirer = require('inquirer');
const connection = require('../../connection');
const {getRoles, getEmployees} = require('./get');

const updatePrompt = async (cb) => {
    let updateChoice = await inquirer.prompt({
        name: 'update',
        type: 'list',
        message: 'What would you like to update?',
        choices: [
            'UPDATE employee role',
            'UPDATE employee manager'
        ],
    })
    switch (updateChoice.update) {
        case 'UPDATE employee role':
        updateRole(cb);
        break;

        case 'UPDATE employee manager':
        updateManager(cb);
        break;
    }
};

const updateRole = async(cb) => {
    const employees = await getEmployees();
    const roles = await getRoles();
    let query = 'UPDATE employees SET ? WHERE ?'
    try {
        let newRoleInfo = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map(employee => employee.first_name),
                message: "Which Employee would you like to update?"
            },
            {
                name: 'role',
                type: 'list',
                choices: roles.map(role => role.title),
                message: "What will be the Employee's new Role?"
            }
        ]);
        let employeeChoice = employees.filter(employee => employee.first_name == newRoleInfo.employee);
        let roleChoice = roles.filter(role => role.title == newRoleInfo.role);
        await connection.query(query, [
            {
                role_id: roleChoice[0].id,
            },
            {
                id: employeeChoice[0].id,
            }
        ]);
        cb();
    } catch (err) {
        if (err) throw err;
    }
};

const updateManager = async(cb) => {
    const employees = await getEmployees();
    const managers = await getEmployees();
    let query = 'UPDATE employees SET ? WHERE ?'
    try {
        let newManagerInfo = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map(employee => employee.first_name),
                message: "Which Employee would you like to update?"
            },
            {
                name: 'manager',
                type: 'list',
                choices: managers.map(manager => manager.first_name),
                message: "Who will be the Employee's new Manager?"
            }
        ]);
        let employeeChoice = employees.filter(employee => employee.first_name == newManagerInfo.employee);
        let managerChoice = managers.filter(manager => manager.first_name == newManagerInfo.manager);

        await connection.query(query, [
            {
                manager_id: managerChoice[0].id,
            },
            {
                id: employeeChoice[0].id,
            }
        ]);
        cb();
    } catch (err) {
        if (err) throw err;
    }
};

module.exports = {updatePrompt};