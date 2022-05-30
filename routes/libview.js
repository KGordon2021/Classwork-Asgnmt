var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections')

router.get('/allrequests', function(req, res, next) {
    if(req.session.loggedin === true && req.session.is_librarian == 0) {
        conn.query('SELECT * FROM books_requested GROUP BY student_id ORDER BY id', function(err, rows){
            if(err) {
            console.log('not being rendered');
            throw err 
            } else {
                res.render('../views/libview', {
                    allrequests: rows,
                    mySession: req.session
                });
            }
        })

    } else {
        res.redirect('/');
        console.log(rows)
    }
});



// router.get('/allrequests/confirm/:id', function(req, res) { //must be router.get or app.get or whatever else i choose but it has to be a get http verb
//     conn.query('SELECT * FROM books_requested WHERE id=' + req.params.id, function(err,row){
//         if(err) {
//             console.log('not being rendered');
//         } else {
//             res.render('../views/editOrders', {cust_orders:row});
//         }
//     });
// });


router.get('/allrequests/viewRecords/:id', (req, res) => {
    let sql =  "SELECT rs.st_fname, rs.st_lname, COUNT(bk.book_requested) AS Title_Of_Book"+
                " FROM registered_students rs, books_requested bk"+
                " WHERE rs.student_id = bk.student_id" +
                " AND rs.id = " + req.params.id
                " GROUP BY rs.st_fname, rs.st_lname;"

    conn.query(sql, (err, rows)=> {
        if (err)
        console.log(err)
        else
        console.log(rows);
        res.render('../views/studentRecords', {
            records: rows
        });
    })
})

router.post('/library/requestConfirmed' , (req, res) => {

    var date_approved = new Date().toLocaleDateString('fr-CA')
    let data = {    student_id: req.body.student_id, 
                    title: req.body.title, 
                    date_requested: req.body.date_reqes,
                    date_approved: date_approved,
                };

        let sqlQuery = "INSERT INTO loans_approved SET ?";
    //  let sqlQuery = "INSERT INTO students (frst_nm, last_nm, email_addr, cohort) VALUES ('"+ req.body.first_name +"', '" + req.body.last_name + "', '"+ req.body.email_address + "','" + req.body.cohort_number +  "') ";


        let vQuery = conn.query(sqlQuery, data,(err, results) => {
        if(err) {
        console.log(err); 
        console.log(date_approved); 
        } else {
        //    res.send(JSONResponse(results));
        res.redirect('/allrequests');
        }
        });

    }); 




//   /* GET ORDERS DELETE METHOD. */
  router.get('/allrequests/delete/:id', function(req, res, next) {
      
    conn.query('DELETE FROM books_requested WHERE id='+ req.params.id, function(err,row)     {
    
           if(err){
            //    req.flash('error', err); 
            console.log(err)
              
           }else{
            // req.flash('success', 'Deleted successfully!!'); 
            res.redirect('/allrequests');   
            next();      
           }
                               
            });
           
       });

       

module.exports = router;