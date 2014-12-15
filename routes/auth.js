var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
    if(req.body.pass == global.password) {
        res.cookie('pass', global.password);
        res.status(200).end();
    }
    else{
        res.status(401).send('Unauthorized');
    }
});

router.get('/', function(req, res) {
    res.json(req.cookies);
});


module.exports = router;