(function() {
    'use strict';

    var express = require('express'),
        router = express.Router(),
        _ = require('lodash'),
        fs = require('fs'),
        http = require('http');

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
                var newRequest = http.request(reloadOptions, function (res) {
                    console.log("Reloaded!");
                });
                newRequest.end();

                res.status(204).send("The file was saved");
            }
        });
    });

    var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
    var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

    var reloadOptions = {
        host: server_ip_address,
        port: server_port,
        path: '/items/reload',
        method: 'POST'
    };

    module.exports = router;
})();