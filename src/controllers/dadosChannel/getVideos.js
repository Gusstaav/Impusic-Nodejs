const mysql = require('mysql2');

module.exports = function getVideos(sqlQry, res, idChannel){
    
    const getVideos = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'impusicjs',
        password: null,
    }); 
    getVideos.connect((err) => {
      
    });

    getVideos.query(sqlQry, (error, results, fields) => {
        if(error){
           res.json(error)
        }
        
        else{
          res.json(results.filter(elements => elements.idchannel == idChannel))
        }
        
        getVideos.end();
    });
}
