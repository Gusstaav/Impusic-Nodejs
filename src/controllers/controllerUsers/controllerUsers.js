const mysql = require('mysql2');

module.exports = function createUser(sqlQry, res){
    
    const createUser = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'impusicjs',
        password: null,
    }); 
    createUser.connect((err) => {
        if(err){
            console.log('nao conectou')
        }else{
            console.log('conectou')
        };
      
    });

    createUser.query(sqlQry, (error, results, fields) => {
        if(error) 
          res.json(error);
        else
        res.redirect('/');
        createUser.end();
        console.log('executou!');
    });
}
