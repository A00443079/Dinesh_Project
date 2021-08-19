
var express = require('express');
var mongodb = require('mongodb');

var connectionString ;

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
};



var app = express();
app.use(express.bodyParser());
app.use(allowCrossDomain);
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/css', express.static(__dirname + '/css'));
app.use(express.static(__dirname));



var server = app.listen(SERVER_PORT, function () {

const SERVER_PORT = 8122;

var user = 'a_roy';
var password = 'A00443079';
var database = 'a_roy';


var host = '127.0.0.1';
var port = '27017';
connectionString = 'mongodb://' + user + ':' + password + '@' +
    host + ':' + port + '/' + database;

        console.log('Listening on port %d',
                server.address().port);
});
app.post('/addUniversity', function (request, response) {

    console.log("Process being executed in " + __dirname);

 
    var num1 = (request.body.Name);
    var num2 = (request.body.Address);
    var num3 = (request.body.Phone);
mongodb.connect(connectionString, function (error, db) {
 
    if (error) {
        throw error;
    }

    uniColl = db.collection("university");

uniColl.insert(request.body, 
        function (err, result) {
           if (err) {
               return response.send(400,'An error occurred saving a record.');
           }
        db.close();
      });

    });

   return response.send(200, "Record saved successfully.");
});

app.post('/deleteUniversity', function (request, response) {

mongodb.connect(connectionString, function (error, db) {
 
    if (error) {
        throw error;
    }

    uniColl = db.collection("university");

uniColl.remove({'Name':request.body.Name}, 
        function (err, result) {
           if (err) {
               return response.send(400,'An error occurred saving a record.');
           }
        db.close();
       return response.send(200, result);
      });

   });

});
app.post('/searchUniversity', function (request, response) {

mongodb.connect(connectionString, function (error, db) {
    if (error) {
        throw error;
    }

    uniColl = db.collection("university");

uniColl.find({'Name':request.body.Name},
        function (err, result) {
           if (err) {
               return response.send(400,'An error occurred saving a record.');
           }
        result.toArray(
            function (err, resultArray) {
            if (err) {
                return response.send(400, 'An error occurred processing your records.');
            }
          return response.send(200, resultArray);
        db.close();
    });

  });
  });
});
app.post('/searchAllUniversity', function (request, response) {

mongodb.connect(connectionString, function (error, db) {
    if (error) {
        throw error;
    }

    uniColl = db.collection("university");

uniColl.find(
        function (err, result) {
           if (err) {
               return response.send(400,'An error occurred saving a record.');
           }
        result.toArray(
            function (err, resultArray) {
            if (err) {
                return response.send(400, 'An error occurred processing your records.');
            }
          return response.send(200, resultArray);
        db.close();
    });

  });
});
});