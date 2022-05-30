var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections')

router.get('/library', function(req, res, next) {
    if(req.session.loggedin === true) {
        conn.query('SELECT * FROM library ORDER BY id', function(err, rows){
            if(err) {
            console.log('not being rendered');
            throw err 
            } else {
                res.render('../views/library', {
                    allBooks: rows,
                    my_session: req.session
                });
            }
        })
    } else {
        res.redirect('login');
    }
});


router.post('/library/request' , (req, res) => {

    let data = {    student_id: req.body.st_id, 
                    book_requested: req.body.title, 
                    date_request: req.body.date
                };

        let sqlQuery = "INSERT INTO books_requested SET ?";
    //  let sqlQuery = "INSERT INTO students (frst_nm, last_nm, email_addr, cohort) VALUES ('"+ req.body.first_name +"', '" + req.body.last_name + "', '"+ req.body.email_address + "','" + req.body.cohort_number +  "') ";


        let vQuery = conn.query(sqlQuery, data,(err, results) => {
        if(err) {
        console.log(err); 
        } else {
        //    res.send(JSONResponse(results));
        res.redirect('/library');
        }
        });

    }); 


module.exports = router;