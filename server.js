var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var app = express();

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var Grid = require('gridfs-stream');

var basicAuth = require('basic-auth-connect');

var gfs;
var db;

// Authenticator
app.use(basicAuth('fileUploadUser', 'iC4nh4ndl3F1l3s'));

app.use('/',       express.static(__dirname + '/client', { maxAge: 0 }));


app.post('/upload',  multer({
    dest:"./tmp/",
  }),
  function(req,res) {

    var fileMulterName = req.files.file.path;
    var filename = req.files.file.originalname;
    var metadata = {
      userName : req.body.userName
    };

    this.writestream = gfs.createWriteStream({
        filename:filename,
        mode:"w",
        chunkSize:1024*256,
        content_type:req.files.file.mimetype,
        root:"fs",
        metadata:metadata
    });

    fs.createReadStream(fileMulterName).pipe(writestream);

    writestream.on('close', function (file) {
      // do something with `file`
      res.sendStatus(200);

      fs.unlink(fileMulterName, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log("successfully deleted temporary File from FS.");
        }
      });
    });
});

app.get('/files/get/:file', function(req,res) {
  try {
    var readstream = gfs.createReadStream({filename:req.params.file});
    readstream.pipe(res);
  }
  catch (error) {
    console.log(error);
  }

});


app.get('/files/:filename', function(req,res) {
  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
    if (err) throw err;
    res.send(files);
  });
});



app.get('/files', function(req,res) {

  gfs.files.find({}).toArray(function (err, files) {
   if (err) {
      res.send(400);
      throw err;
    }
    else {
      res.json(files);
    }
  });
});

// Initialize MongoDB connection once
MongoClient.connect("mongodb://localhost/test", function(err, database) {
  if(err) throw err;
  db = database;
  gfs = Grid(db, mongo);
});

app.listen(8080); // <<---- Start Listening to Port



