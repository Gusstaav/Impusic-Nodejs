const e = require('express');
const mysql = require('mysql2');

module.exports = function getVideosFeed(sqlQry, res, idChannel){
    
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
           console.log(error)
        }
        
        else{
          res.json(results)

        }
        
        getVideos.end();
    });
}
