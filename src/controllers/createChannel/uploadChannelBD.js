const mysql = require('mysql2');

module.exports = function uploadChannelBD(sqlQry, res, idUser){
    
    const uploadChannelBD = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'impusicjs',
        password: null,
    }); 
    uploadChannelBD.connect((err) => {
      
    });

    uploadChannelBD.query(sqlQry, (error, results, fields) => {
        if(error){
           console.log('erro')
        }
        
        else{
          res.redirect('/homeuserid/'+idUser)
        }
        
        uploadChannelBD.end();
    });
}
