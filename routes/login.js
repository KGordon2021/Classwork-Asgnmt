var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');
var bcrypt = require('bcrypt')

//renders longin view
router.get('/login', function(req, res, next) {
    res.render('../views/login');
});

//authenticates user 
router.post('/student/login', async (req, res, next) =>{
    var email = req.body.usr_email;
    var password = req.body.pswrd;

    conn.query('SELECT * FROM registered_students WHERE st_email = ?', [email], function(error, rows, fields){ //santitizes and cleanses your code
        if (rows[0].st_pswd) {
            bcrypt.compare(req.body.pswrd, rows[0].st_pswd, function(err, result) {
             console.log('>>>>>> ', password)
             console.log('>>>>>> ', rows[0].st_pswd)
             if(result) {
                req.session.loggedin = true;
                req.session.first_Nm = rows[0].st_fname;
                req.session.last_Nm = rows[0].st_lname;
                req.session.student_id = rows[0].student_id;
               res.redirect('/library');
               return 
             }
             else {
               return res.status(400).send();
             }
            
    });   
}
})
})

//to log out user

router.get('/logout', function(req, res){
    req.session.destroy();
    // req.flash('success', "Enter your Login Credentials");
    res.redirect('/login');
})

module.exports = router;