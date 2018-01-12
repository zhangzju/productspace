const express = require("express");
const fs = require("fs");
const config = require('dotenv').config();

var app = express();

app.get('/', function (req, res) {
  res.send('online!\n');
})

app.get('/model', function (req, res) {
  res.send(config);
})

const server = app.listen(3000, function(){
  const host = server.address().address;
  const port = server.address().port;
})
