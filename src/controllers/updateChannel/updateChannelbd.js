const mysql = require('mysql2');

module.exports = function updateChannel(sqlQry, res, iduser){
    
    const updateChannel = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'impusicjs',
        password: null,
    }); 
    updateChannel.connect((err) => {
      
    });

    updateChannel.query(sqlQry, (error, results, fields) => {
        if(error){
           console.log('erro')
        }
        
        else{
          res.redirect('/homeuserid/'+ iduser)
        }
        
        updateChannel.end();
    });
}
