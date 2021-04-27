const mysql = require('mysql');
const inquirer = require('inquirer');
// i think i need express here???

const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT || 8000,
    user: 'root',
    password: 'password',
    database: 'employee_recordsdb',

})

connection.connect((err) => {
    if (err) throw err;
    startEmployeeTracker();
});

const startEmployeeTracker = async () => {
     let categoryChoice = await inquirer.prompt({
        name:'category',
        type:'list',
        message:'What would you like to do with the Employee Database?',
        choices: [
            'VIEW',
            'ADD',
            'UPDATE',
            'DELETE',
            'BUDGET'
        ],
    })
        switch (categoryChoice) {
            case 'VIEW':
            viewPrompt();
            break;

            case 'ADD':
            addPrompt();
            break;
            
            case 'UPDATE':
            updatePrompt();
            break;

            case 'DELETE':
            deletePrompt();
            break;

            case 'BUDGET':
            budgetPrompt();
            break;
        }
};