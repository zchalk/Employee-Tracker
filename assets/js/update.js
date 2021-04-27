const inquirer = require('inquirer');

const updatePrompt = async () => {
    let updateChoice = await inquirer.prompt({
        name: 'update',
        type: 'list',
        message: 'What would you like to update?',
        choices: [
            'UPDATE employee role',
            'UPDATE employee manager'
        ],
    })
    switch (updateChoice) {
        // does that need to be .view?
        case 'UPDATE employee role':
        updateRole();
        break;

        case 'UPDATE employee manager':
        updateManager();
        break;
    }
};

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
//redundancy
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
const getManagers = async() => {
    var currentManagers = [];
    var query = 'SELECT last_name, first_name, id FROM employees WHERE manager_id IS NULL ORDER BY id';
    try {
    let results = await connection.query(query);
    //how to push both first and last
    results.forEach(result => currentManagers.push(result.last_name));
    return currentManagers;
    } catch (err) {
        if (err) throw err;
    }
    };

const updateRole = async() => {
    let query = 'UPDATE employees SET ? WHERE ?'
    try {
        let newRoleInfo = await inquirer.prompt([
            {
                name: 'employee',
                type: 'rawlist',
                choices: getEmployees(),
                message: "Which Employee would you like to update?"
            },
            {
                name: 'role',
                type: 'rawlist',
                choices: getRoles(),
                message: "What will be the Employee's new Role?"
            }
        ]);
        const employeeChoice = getEmployees().indexOf(newRoleInfo.employee) + 1;
        const roleChoice = getRoles().indexOf(newRoleInfo.role) + 1;

        await connection.query(query, [
            {
                role_id: roleChoice,
            },
            {
                id: employeeChoice,
            }
        ])
    } catch (err) {
        if (err) throw err;
    }
};

const updateManager = async() => {
    let query = 'UPDATE employees SET ? WHERE ?'
    try {
        let newManagerInfo = await inquirer.prompt([
            {
                name: 'employee',
                type: 'rawlist',
                choices: getEmployees(),
                message: "Which Employee would you like to update?"
            },
            {
                name: 'manager',
                type: 'rawlist',
                choices: getManagers(),
                message: "What will be the Employee's new Role?"
            }
        ]);
        const employeeChoice = getEmployees().indexOf(newRoleInfo.employee) + 1;
        const managerChoice = getManagers().indexOf(newRoleInfo.role) + 1;

        await connection.query(query, [
            {
                manager_id: managerChoice,
            },
            {
                id: employeeChoice,
            }
        ])
    } catch (err) {
        if (err) throw err;
    }
};

module.exports = {updatePrompt, getEmployees, getRoles, getManagers, updateRole, updateManager}