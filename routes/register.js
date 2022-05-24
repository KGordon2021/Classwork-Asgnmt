var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');
var bcrypt = require('bcrypt');

//renders longin view
router.get('/register', function(req, res, next) {
    res.render('../views/register');
});

router.post('/student/registration' , async(req, res) => {
    // generating the code
// var code = Date.now().toString().slice(-4);
// var order_Date = new Date().toLocaleDateString('fr-CA');
// var order_Time = new Date().toLocaleTimeString();
var value = req.body.pswrd;
const salt =  await bcrypt.genSalt(12); // the sync alternative const salt = bcrypt.genSaltSync(12) where no await function is used
value =  await bcrypt.hash(value, salt) // similarly the sync alternative value = bcrypt.hash(value, salt)

let data = {    student_id:     req.body.S_Id, 
                st_fname: req.body.f_nm, 
                st_lname: req.body.l_nm,
                st_email: req.body.usr_email,
                st_pswd: value,
            };

    let sqlQuery = "INSERT INTO registered_students SET ?";
//  let sqlQuery = "INSERT INTO students (frst_nm, last_nm, email_addr, cohort) VALUES ('"+ req.body.first_name +"', '" + req.body.last_name + "', '"+ req.body.email_address + "','" + req.body.cohort_number +  "') ";


    let vQuery = conn.query(sqlQuery, data,(err, results) => {
    if(err) {
      console.log(err); 
    } else {
    //    res.send(JSONResponse(results));
       res.redirect('/');
    }
    });
}); 

module.exports = router;