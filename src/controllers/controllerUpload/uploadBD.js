const mysql = require('mysql2');

module.exports = function uploadVIdeo(sqlQry, res, req){
    
    const uploadVideo = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'impusicjs',
        password: null,
    }); 
    uploadVideo.connect((err) => {
      
    });

    uploadVideo.query(sqlQry, (error, results, fields) => {
        if(error){
           res.json(error)
        }
        
        else{
          console.log('deu certo')
        }
        
        uploadVideo.end();
    });
}
