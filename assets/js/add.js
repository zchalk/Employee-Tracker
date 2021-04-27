const inquirer = require('inquirer');
// add connection export?
//add manager function?

const addPrompt = async () => {
    let addChoice = await inquirer.prompt({
        name: 'view',
        type: 'list',
        message: 'What would you like to ADD?',
        choices: [
            'ADD new employee',
            'ADD new department',
            'ADD new role',
        ],
    })
    switch (addChoice) {
        case 'ADD new employee':
        addEmployee();
        break;

        case 'ADD new department':
        addDepartment();
        break;

        case 'ADD new role':
        addRole();
        break;
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

const addEmployee = async() => {
    let query = 'INSERT INTO employees SET ?'
    try {
    let newEmployeeInfo = await inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: "Enter the new Employee's first name"
        },
        {
            name: 'last_name',
            type: 'input',
            message: "Enter the new Employee's last name"
        },
        {
            name: 'role',
            type: 'rawlist',
            choices: getRoles(),
            message: "What is the new Employee's role?"
        },
        {
            name: 'manager',
            type: 'rawlist',
            choices: getManagers(),
            message: "Who is the new Employee's manager?"
        }
        ]);
        //is this calling the function again? if so probably better way to do this. call at first then use answer.choice as index in query?
    const roleChoice = getRoles().indexOf(newEmployeeInfo.role) + 1;
    const managerChoice = getManagers().indexOf(newEmployeeInfo.manager) + 1;

    await connection.query(query, {
        first_name: newEmployeeInfo.first_name,
        last_name: newEmployeeInfo.last_name,
        role_id: roleChoice,
        manager_id: managerChoice
    })
    startEmployeeTracker();
} catch (err) {
    if (err) throw err;
}
};

const addDepartment = async() => {
    let query = 'INSERT INTO departments SET ?'
    try {
        let newDepartmentInfo = await inquirer.prompt(
            {
                name: 'department_name',
                type: 'input',
                message: "What is the name of the new Department?"
            }
        );
            await connection.query(query, {
                department_name: newDepartmentInfo.department_name
            });
            startEmployeeTracker();
    } catch (err) {
        if (err) throw err;
    }
};

const addRole = async() => {
    let query = 'INSERT INTO roles SET ?'
    try {
        let newRoleInfo = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: "What is the new Role's title?"
            },
            {
                name: 'salary',
                type: 'input',
                message: "What is the new Role's salary?"
            },
            {
                name: 'department',
                type: 'rawlist',
                choices: getDepartments(),
                message: 'Which department does this new Role belong to?'
            }
        ]);
        const departmentChoice = getDepartments().indexOf(newRoleInfo.department) + 1;
        await connection.query(query, {
            title: newRoleInfo.title,
            salary: newRoleInof.salary,
            department_id: departmentChoice
        });
        startEmployeeTracker();
    } catch (err) {
        if (err) throw err;
    }
};

module.exports = {addPrompt, getDepartments, getRoles, getManagers, addEmployee, addDepartment, addRole}