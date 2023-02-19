const connection = require('../connection/connection');
const mysql = require('mysql2');

module.exports = function alterVideosTable(conn) {

        const sql = `ALTER TABLE videos ADD CONSTRAINT idchannel FOREIGN KEY (idchannel) REFERENCES channels (id);`;
        
        conn.query(sql, (error, results, fields) => {
            if(error) return console.log(error);
            console.log('alter feito no videos!');
        });
}