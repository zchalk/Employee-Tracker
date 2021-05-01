const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./connection');
const {addPrompt} = require('./assets/js/add');
const {viewPrompt} = require('./assets/js/view');
const {updatePrompt} = require('./assets/js/update');
const {deletePrompt} = require('./assets/js/delete');
// do i need express??


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
        switch (categoryChoice.category) {
            case 'VIEW':
            viewPrompt(startEmployeeTracker);
            break;

            case 'ADD':
            addPrompt(startEmployeeTracker);
            break;
            
            case 'UPDATE':
            updatePrompt(startEmployeeTracker);
            break;

            case 'DELETE':
            deletePrompt(startEmployeeTracker);
            break;

            case 'BUDGET':
            budgetPrompt(startEmployeeTracker);
            break;
        }
}
module.exports = startEmployeeTracker;