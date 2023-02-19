const mysql = require('mysql2');

module.exports = function verifyChannel(sqlQry, res, idUser){
    
    const verifyChannel = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'impusicjs',
        password: null,
    }); 
    verifyChannel.connect((err) => {
        if(err){
            console.log('nao conectou')
        }
    });


    verifyChannel.query(sqlQry, (error, results, fields) => {
        if(error){ 
          res.json(error);
        }
        if(results.filter(elements => elements.iduser == idUser) == false){
            res.redirect('/createChannel/'+idUser+'/')
        }
        if(results.filter(elements => elements.iduser == idUser)){
          res.redirect('/channel/'+results[0].iduser)
        }
        verifyChannel.end();
        
    });
}

