const mysql = require('mysql2');

module.exports = function Connection(sqlQry, res, id){
    
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'impusicjs',
        password: null,
    }); 
    connection.connect((err) => {
        if(err){
            console.log('nao conectou')
        }
    });

    connection.query(sqlQry, (error, results, fields) => {
        if(error) 
          res.json(error);
        else
          console.log(results.filter(elements => elements.idchannel == id));
        connection.end();
        
    });
}


