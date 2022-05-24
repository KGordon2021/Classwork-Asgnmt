var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');

//renders longin view
router.get('/login', function(req, res, next) {
    res.render('../views/login');
});

//authenticates user 
router.post('/student/login', function(req, res, next){
    var email = req.body.usr_email;
    var password = req.body.pswrd;

    conn.query('SELECT * FROM registered_students WHERE st_email = ? AND BINARY st_pswd = ?', [email, password], function(err, rows, fields){ //santitizes and cleanses your code
        // console.log(rows.length);
        if(rows.length <= 0) {
            req.flash ('error, Invalid credentials. Please try again!')
            res.redirect('/login')
            // throw err;
            console.log(err);
        } 
        else {
            req.session.loggedin = true;
            req.session.first_Nm = rows[0].st_fname;
            req.session.last_Nm = rows[0].st_lname;
            req.session.student_id = rows[0].student_id;
            // console.log(req.session);
            res.redirect('/library')
        }
    })
})

//to log out user

router.get('/logout', function(req, res){
    req.session.destroy();
    req.flash('success', "Enter your Login Credentials");
    res.redirect('/login');
})

module.exports = router;