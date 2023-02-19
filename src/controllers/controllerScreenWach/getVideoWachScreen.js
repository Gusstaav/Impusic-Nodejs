const mysql = require('mysql2');

module.exports = function getVideoWachScreen(sqlQry, res, idChannel){
    
    const getVideoWachScreen = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'impusicjs',
        password: null,
    }); 
    getVideoWachScreen.connect((err) => {
      
    });

    getVideoWachScreen.query(sqlQry, (error, results, fields) => {
        if(error){
           res.json(error)
        }
        
        else{
          res.json(results)
        
        }
        
        getVideoWachScreen.end();
    });
}
