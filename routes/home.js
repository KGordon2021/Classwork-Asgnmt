var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('../views/home',
    {my_session: req.session});
});

module.exports = router;