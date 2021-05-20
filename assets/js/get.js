const connection = require('../../connection');


const getDepartments = async() => {
    var query = 'SELECT department_name, id FROM departments ORDER BY id';
    try {
        let currentDepartments = await connection.query(query);
        return currentDepartments;
    } catch (err) {
        if (err) throw err;
    }
};
const getRoles = async() => {
    var query = 'SELECT title, id FROM roles ORDER BY id';
    try {
        let currentRoles = await connection.query(query)
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
module.exports = {getDepartments, getRoles, getEmployees};    