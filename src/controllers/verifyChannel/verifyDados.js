const mysql = require('mysql2');

module.exports = function verifyDados(sqlQry, res, idUser){
    
    const verifyDados = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'impusicjs',
        password: null,
    }); 
    verifyDados.connect((err) => {
        if(err){
            console.log('nao conectou')
        }
    });

    const url = {'url':'/channel/'}
    verifyDados.query(sqlQry, (error, results, fields) => {
        if(error){ 
          res.json(error);
        }
        if(results.filter(elements => elements.iduser == idUser) == false){
           return(res.json([]))
        }
        if(results.filter(elements => elements.iduser == idUser)){
            var o1 = results.filter(elements => elements.iduser == idUser);
           

            var obj = Object.assign(url, o1);
            

          const juncao = []
          
          res.json(obj)
        }
        verifyDados.end();
        
    });
}
