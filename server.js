var fs = require('fs');
var express = require('express');

//var bodyParser = require('body-parser');
//app.use(bodyParser.json()); //express.json() middleware is available in Express v4.16.0 onwards.
var app = express();
app.use(express.json());

var obj;

try {
  app.get('/getNote', function (req, res) {
    fs.readFile('./test.json', 'utf-8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      res.send(obj);
    });
  });

  app.post('/updateNote/:note', function (req, res) {
    fs.readFile('./test.json', 'utf-8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      if (obj.txt)
      {
        obj.txt.push(req.params.note);
      } else
      {
        obj.txt = [req.params.note];
      }

      fs.writeFile('./test.json', JSON.stringify(obj), function (err) {
        if (err) throw err;
        res.send(obj);
        console.log('file updated');
      });
    });
  });

  app.use(function (req, res, next) {
    var msg = 'request endpoint not supported: method: ' +
     req.method + ' url: ' + req.originalUrl;

    res.status(404).send(msg);
    console.log(msg);
  });

}
catch (err) {
  console.log(err.name + ' : ' + err.message);
}

app.listen(3000);
