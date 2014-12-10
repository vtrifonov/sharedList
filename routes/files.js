(function() {
    'use strict';

    var express = require('express'),
        router = express.Router(),
        _ = require('lodash'),
        fs = require('fs');

    var dataFolder = 'data';

    router.get('/:fileName', function (req, res) {
        var filePath = dataFolder + '/' + req.params.fileName;
        if (fs.existsSync(filePath)) {
            fs.readFile(filePath, "utf8", function (err, data) {
                if (!err) {
                    res.json((JSON.parse(data)));
                }
                else
                {
                    res.status(500).send(err);
                }
            });
        }
        else
        {
            res.status(404).send('there is no items for ' + req.params.date.trim());
        }
    });

    router.post('/:fileName', function (req, res) {
        var filePath = dataFolder + '/' + req.params.fileName;
        fs.writeFile(filePath, JSON.stringify(req.body), function (err) {
            if (err) {
                console.log(err);
                res.status(500).send('Error writing file!');
            } else {
                console.log("The file was saved!");
                res.status(204).send("The file was saved");
            }
        });
    });

    module.exports = router;
})();