const connection = require('../connection/connection');
const mysql = require('mysql2');

module.exports = function channelTable(conn) {

        const sql = `CREATE TABLE IF NOT EXISTS channels(
            id int NOT NULL AUTO_INCREMENT,
            iduser int NOT NULL,
            name varchar(255) NOT NULL,
            urlfoto varchar(255) NOT NULL,
            urlbanner varchar(255) NOT NULL,
            PRIMARY KEY (id)
        );`;
        
        conn.query(sql, (error, results, fields) => {
            if(error) return console.log(error);
            console.log('criou a tabela!');
        });
}