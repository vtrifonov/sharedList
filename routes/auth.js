var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
    if(req.body.pass == global.password) {
        var expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate()+14);
        res.cookie('pass', global.password, { expires: expiresIn });
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