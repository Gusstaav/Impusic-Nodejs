const mysql = require('mysql2');

module.exports = function getChannel(sqlQry, res, idUser){
    
    const getChannel = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'impusicjs',
        password: null,
    }); 
    getChannel.connect((err) => {
      
    });

    getChannel.query(sqlQry, (error, results, fields) => {
        if(error){
           console.log('erro')
        }
        
        else{
          res.json(results)
        }
        
        getChannel.end();
    });
}
