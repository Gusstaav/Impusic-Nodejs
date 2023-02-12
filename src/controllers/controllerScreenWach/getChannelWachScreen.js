const mysql = require('mysql2');

module.exports = function getChannelWachScreen(sqlQry, res, idChannel){
    
    const getChannelWachScreen = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'impusicjs',
        password: null,
    }); 
    getChannelWachScreen.connect((err) => {
      
    });

    getChannelWachScreen.query(sqlQry, (error, results, fields) => {
        if(error){
           res.json(error)
        }
        
        else{
          res.json(results)
        
        }
        
        getChannelWachScreen.end();
    });
}