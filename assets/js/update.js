const inquirer = require('inquirer');
const connection = require('../../connection');

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
        // does that need to be .view?
        case 'UPDATE employee role':
        updateRole(cb);
        break;

        case 'UPDATE employee manager':
        updateManager(cb);
        break;
    }
};

const getEmployees = async() => {
    var query = 'SELECT last_name, first_name, id FROM employees ORDER BY id'
    try {
        let currentEmployees = await connection.query(query);
        return currentEmployees;
        } catch (err) {
            if (err) throw err;
        }
    };
//redundancy
const getRoles = async() => {
    var query = 'SELECT title, id FROM roles ORDER BY id';
    try {
    let currentRoles = await connection.query(query);
    //how to push both first and last
    return currentRoles;
    } catch (err) {
        if (err) throw err;
    }
    };
// const getManagers = async() => {
//     var currentManagers = [];
//     var query = 'SELECT last_name, first_name, id FROM employees WHERE manager_id IS NULL ORDER BY id';
//     try {
//     let results = await connection.query(query);
//     //how to push both first and last
//     results.forEach(result => currentManagers.push(result.last_name));
//     return currentManagers;
//     } catch (err) {
//         if (err) throw err;
//     }
//     };

const updateRole = async(cb) => {
    const employees = await getEmployees();
    const roles = await getRoles();
    let query = 'UPDATE employees SET ? WHERE ?'
    try {
        let newRoleInfo = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map(employee => employee. last_name),
                message: "Which Employee would you like to update?"
            },
            {
                name: 'role',
                type: 'list',
                choices: roles.map(role => role.title),
                message: "What will be the Employee's new Role?"
            }
        ]);
        let employeeChoice = employee.filter(employee => employee.last_name == newRoleInfo.role);
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
                choices: employees.map(employee => employee. last_name),
                message: "Which Employee would you like to update?"
            },
            {
                name: 'manager',
                type: 'list',
                choices: managers.map(manager => manager.last_name),
                message: "Who will be the Employee's new Manager?"
            }
        ]);
        let employeeChoice = employee.filter(employee => employee.last_name == newManagerInfo.role);
        let managerChoice = manager.filter(manager => manager.last_name == newManagerInfo.manager);

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

module.exports = {updatePrompt, getEmployees, getRoles, updateRole, updateManager}