var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var app = express();

var basicAuth = require('basic-auth-connect');


// Authenticator
app.use(basicAuth('fileUploadUser', 'iC4nh4ndl3F1l3s'));

app.use('/',       express.static(__dirname + '/client', { maxAge: 0 }));

// Mount the tmp folder to our file/get path -> No auth required there
app.use('/file/get', express.static(__dirname + '/uploads', { maxAge: 0 }));

app.post('/upload',  multer({
    dest:"./uploads/",
    rename: function (fieldname, filename, req, res) {
      return filename;
  }
}));

app.get('/file/:filename', function(req,res) {
  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
    if (err) throw err;
    res.send(files);
  });
});

// Initialize MongoDB connection once
MongoClient.connect("mongodb://localhost/test", function(err, database) {
  if(err) throw err;
  db = database;
  gfs = Grid(db, mongo);
});

app.listen(8080); // <<---- Start Listeining to Port



