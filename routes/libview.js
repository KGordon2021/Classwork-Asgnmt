var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections')

router.get('/allrequests', function(req, res, next) {
    if(req.session.loggedin === true) {
        conn.query('SELECT * FROM books_requested ORDER BY id', function(err, rows){
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
    }
});



router.get('/viewOrders/edit/:id', function(req, res) { //must be router.get or app.get or whatever else i choose but it has to be a get http verb
    conn.query('SELECT * FROM customer_orders WHERE id=' + req.params.id, function(err,row){
        if(err) {
            console.log('not being rendered');
        } else {
            res.render('../views/editOrders', {cust_orders:row});
        }
    });
});

   /* POST ordersedit page. */
router.post('/viewOrders/update', function(req, res, next) {
      
    let sqlQuery = "UPDATE customer_orders SET customer_order ='" + req.body.cust_order +  
                                        "', customer_email ='" +  req.body.cust_email +
                                        "', order_date ='" +  req.body.order_date + 
                                        "' WHERE id = " + req.body.id;

    conn.query(sqlQuery, function(err,rows)     {

        if(err) {
            console.log(err)
        } else {
            res.redirect('/admin');   
            next();
        }   
               //req.flash('error', err); 
                              
            });
           
       });




  /* GET ORDERS DELETE METHOD. */
  router.get('/viewOrders/delete/:id', function(req, res, next) {
      
    conn.query('DELETE FROM customer_orders WHERE id='+ req.params.id, function(err,row)     {
    
           if(err){
            //    req.flash('error', err); 
            console.log(err)
              
           }else{
            // req.flash('success', 'Deleted successfully!!'); 
            res.redirect('/admin');   
            next();      
           }
                               
            });
           
       });

       

module.exports = router;