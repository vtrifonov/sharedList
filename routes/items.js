(function() {
  'use strict';

  var express = require('express'),
      router = express.Router(),
      _ = require('lodash'),
      fs = require('fs'),
      mkdirp = require('mkdirp');

  var dataFolder = 'data';
  var filePath = dataFolder + '/data.json';

  var items = [];

  /* GET users listing. */
  router.get('/', function (req, res) {
    res.json(items);
  });

  router.get('/filtered/:date', function (req, res) {
    var result = _.filter(items, function (item) {
      return item.date == req.params.date.trim();
    });
    if (result.length > 0)
    {
        res.json(result[0].items);
    }
    else
    {
      res.status(404).send('there are no items for ' + req.params.date.trim());
    }
  });

  router.delete('/delete/:date/:name', function (req, res) {
    var dateItem = _.filter(items, function (item) { return item.date == req.params.date.trim(); });
    if (dateItem.length > 0)
    {
      var itemsToDelete = _.filter(dateItem[0].items, function(item){ return item.name == req.params.name.trim();});
      if(itemsToDelete.length > 0)
      {
        dateItem[0].items = _.filter(dateItem[0].items, function(item){ return item.name != req.params.name.trim();});
        saveItemsData(function (err) {
          if (err) {
            console.log(err);
            res.status(500).send('Error deleting element!');
          } else {
            console.log("The file was saved!");
            res.status(204).send("The entry was deleted");
          }
        });
      }
      else
      {
        res.status(404).send('there is no item with name ' + req.params.name  + ' for ' + req.params.date.trim());
      }
    }
    else
    {
      res.status(404).send('there are no items for ' + req.params.date.trim());
    }
  });

  router.delete('/deleteDate/:date/', function (req, res) {
    var dateItem = _.filter(items, function (item) { return item.date == req.params.date.trim(); });
    if (dateItem.length > 0)
    {
      _.remove(items, function (item) { return item.date == req.params.date.trim(); });

      saveItemsData(function (err) {
          if (err) {
            console.log(err);
            res.status(500).send('Error deleting element!');
          } else {
            console.log("The file was saved!");
            res.status(204).send("The entry was deleted");
          }
        });
    }
    else
    {
      res.status(404).send('there are no items for ' + req.params.date.trim());
    }
  });

  router.get('/distinct/', function (req, res) {
    var distinctItems = [];
    _.forEach(items, function(item) {
      distinctItems = _.union(distinctItems, item.items);
    });
    var distinctNames = [];
    _.forEach(distinctItems, function(item){
      distinctNames.push(item.name);
    });

    distinctNames = _.uniq(distinctNames, true);
    res.json(distinctNames);
  });

  router.get('/dates/', function (req, res) {
    var dates = [];
    _.forEach(items, function(item) {
      dates.push(item.date);
    });
    res.json(dates);
  });

  router.post('/reload', function (req, res) {
    loadItemsData();
    res.status(204).send('Items Reloaded!');
  });

  router.post('/', function (req, res) {
    var requestItem = req.body;

    if (!requestItem.date) {
      res.status(400).send('Please provide date!');
      res.end();
    }
    //else if(!requestItem.item) {
    //  res.status(400).send('Please provide item!');
    //  res.end();
    //}
    else if(requestItem.item && !requestItem.item.name) {
      res.status(400).send('Please provide name!');
      res.end();
    }
    else {

      var currentDate = new Date().toISOString();

      var itemForDate = _.find(items, function (item) { return item.date === requestItem.date.trim()});

      if(!itemForDate)
      {
        itemForDate = {
          date: requestItem.date,
          createdOn: currentDate,
          items: []
        };
        items.push(itemForDate);
      }

      if(requestItem.item && _.find(itemForDate.items, function(item){return item.name === requestItem.item.name}))
      {
        res.status(409).send('Item already exists!');
        return;
      }
      else if (requestItem.item){
        itemForDate.items.push(requestItem.item);
      }

      sortItems();

      saveItemsData(function (err) {
        if (err) {
          console.log(err);
          res.status(500).send('Error saving file!');
        } else {
          console.log("The file was saved!");
          res.status(201).send("The entry was saved");
        }
      });
    }
  })

  var loadItemsData = function () {
    //Read Constant User Licenses for Data file
    if(!fs.existsSync(dataFolder)) {
      mkdirp(dataFolder);
    }
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
    fs.readFile(filePath, "utf8", function (err, data) {
      if (!err) {
        items = JSON.parse(data);
        sortItems();
      }
    });
  };

  var sortItems = function(){
    items = _.sortBy(items, function (item) {
      if(item.createdOn) {
        return new Date(item.createdOn);
      }
      else
      {
        return null;
      }
    })
    items = items.reverse();
  }

  var saveItemsData = function (success) {
    fs.writeFile(filePath, JSON.stringify(items), success);
  }

  loadItemsData();

  module.exports = router;
})();