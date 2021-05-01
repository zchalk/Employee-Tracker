const mysql = require('mysql');
const {promisify} = require('util'); 

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_recordsdb',

})
connection.query = promisify(connection.query);

module.exports = connection;