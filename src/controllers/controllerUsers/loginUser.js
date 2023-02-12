const mysql = require('mysql2');

module.exports = function verifyUser(sqlQry, res, alert){
    
    const verifyUser = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'impusicjs',
        password: null,
    }); 
    verifyUser.connect((err) => {
      
    });

    verifyUser.query(sqlQry, (error, results, fields) => {
        if(error){
           res.json(error)
        }
        if(results == false){
            res.redirect('/#demo-modal-error');
        }
        else{
          res.redirect(`/homeuserid/${results[0].id}`)
        }
        
        verifyUser.end();
    });
}
