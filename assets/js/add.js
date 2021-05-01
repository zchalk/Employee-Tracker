const inquirer = require('inquirer');
const connection = require('../../connection');
// add connection export?
//add manager function?

const addPrompt = async (cb) => {
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
    switch (addChoice.view) {
        case 'ADD new employee':
        addEmployee(cb);
        break;

        case 'ADD new department':
        addDepartment(cb);
        break;

        case 'ADD new role':
        addRole(cb);
        break;
    }
};

const getDepartments = async() => {
// double check this will empty array everytime or do i even need it, is results an array already?
var query = 'SELECT department_name, id FROM departments ORDER BY id';
try {
let currentDepartments = await connection.query(query);
// console.log(results.department_name);
//how to push both name and id
console.log(currentDepartments);
return currentDepartments;
} catch (err) {
    if (err) throw err;
}
};
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
const getEmployees = async() => {
    var query = 'SELECT last_name, first_name, id FROM employees ORDER BY id'
    try {
        let currentEmployees = await connection.query(query);
        return currentEmployees;
        } catch (err) {
            if (err) throw err;
        }
    };   
// const getManagers = async() => {
//     var query = 'SELECT last_name, first_name, id FROM employees WHERE manager_id IS NULL ORDER BY id';
//     try {
//     let currentManagers = await connection.query(query);
//     //how to push both first and last
//     results.forEach(result => currentManagers.push(result.last_name));
//     return currentManagers;
//     } catch (err) {
//         if (err) throw err;
//     }
//     };

const addEmployee = async (cb) => {
    const employees = await getEmployees();
    const roles = await getRoles();
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
            type: 'list',
            choices: roles.map(role => role.title),
            message: "What is the new Employee's role?"
        },
        {
            name: 'manager',
            type: 'list',
            choices: employees.map(employee => employee.last_name),
            message: "Who is the new Employee's manager?"
        }
        ]);
        //is this calling the function again? if so probably better way to do this. call at first then use answer.choice as index in query?
        let roleChoice = roles.filter(role => role.title == newEmployeeInfo.role);
        let employeeChoice = employee.filter(employee => employee.last_name == newEmployeeInfo.manager);

    await connection.query(query, {
        first_name: newEmployeeInfo.first_name,
        last_name: newEmployeeInfo.last_name,
        role_id: roleChoice[0].id,
        manager_id: employeeChoice[0].id
    })
    cb();
} catch (err) {
    if (err) throw err;
}
};

const addDepartment = async(cb) => {
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
            cb();
    } catch (err) {
        if (err) throw err;
    }
};

const addRole = async(cb) => {
    let query = 'INSERT INTO roles SET ?';
    const departments = await getDepartments();
    console.log(departments);
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
                type: 'list',
                choices: departments.map(department => department.department_name),
                message: 'Which department does this new Role belong to?'
            }
        ]);
        let departmentChoice = departments.filter(department => department.department_name == newRoleInfo.department);
        console.log(departmentChoice);
        await connection.query(query, {
            title: newRoleInfo.title,
            salary: newRoleInfo.salary,
            department_id: departmentChoice[0].id
        });
        cb();
    } catch (err) {
        if (err) throw err;
    }
};

module.exports = {addPrompt, getDepartments, getRoles, addEmployee, addDepartment, addRole}