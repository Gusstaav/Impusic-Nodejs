const connection = require('../connection/connection');
const mysql = require('mysql2');



module.exports = function userTable(conn) {
    const sql = `create TABLE IF NOT EXISTS users(
        id int NOT NULL AUTO_INCREMENT,
        name varchar(150) NOT NULL,
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        PRIMARY KEY (id)
        );`;
        
        conn.query(sql, (error, results, fields) => {
            if(error) return console.log(error);
            console.log('criou a tabela!');
        });
}