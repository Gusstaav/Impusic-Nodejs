const connection = require('../connection/connection');
const mysql = require('mysql2');

module.exports = function videosTable(conn) {

        const sql = `CREATE TABLE IF NOT EXISTS videos(
            id int NOT NULL AUTO_INCREMENT,
            idchannel int NOT NULL,
            title varchar(255) NOT NULL,
            description varchar(255) NOT NULL,
            urlvideo varchar(255) NOT NULL,
            urlcapa varchar(255) NOT NULL,
            PRIMARY KEY (id)
        );`;
        
        conn.query(sql, (error, results, fields) => {
            if(error) return console.log(error);
            console.log('criou a tabela!');
        });
}