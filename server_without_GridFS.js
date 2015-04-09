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


app.listen(8080); // <<---- Start Listening to Port



