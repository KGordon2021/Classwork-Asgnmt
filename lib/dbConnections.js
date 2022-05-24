var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",   
    user: "root",    
    password: "Kristine@2018",   
    database: "school_library_system"  
  });

  
  conn.connect((err)=> {
    if(!err)
        console.log('Connected to database Successfully');
    else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

    module.exports = conn;