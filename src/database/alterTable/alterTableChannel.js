const connection = require('../connection/connection');
const mysql = require('mysql2');

module.exports = function alterChannelTable(conn) {

        const sql = `ALTER TABLE channels ADD CONSTRAINT iduser FOREIGN KEY (iduser) REFERENCES users (id);`;
        
        conn.query(sql, (error, results, fields) => {
            if(error) return console.log(error);
            console.log('alter feito!');
        });
}