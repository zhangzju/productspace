const express = require("express");
const fs = require("fs");
const config = require('dotenv').config();
const multer  = require('multer');
const path = require('path');

var app = express();

let model;

app.use(express.static('public'));

app.get('/', function (req, res) {
  fs.readdir(".",function(err, files){
    if(err) {
      res.send("Error!");
    }
    res.sendFile("public/index.html");
  });
})

app.get('/modelinfo', function (req, res) {
  fs.readdir(config.parsed.ROOTDIR, function(err, files){
    if(err){
      res.send("Error!");
    }

    res.send(files);
  })
})

app.get('/test', function(req, res){
  let structure = walk(config.parsed.ROOTDIR);
  res.send(structure);
})

app.get('/download', function(req, res){
  let model = req.query.model;
  let spec = req.query.spec;
  let date = req.query.date;
  let filename = req.query.filename;
  var file = path.join(config.parsed.ROOTDIR,model,spec,date,filename);
  res.download(file); 
 });

app.get('/model', function(req,res){
  let model = req.query.model;
  let spec = req.query.spec;
  res.send(model+spec);
})

function walk(dir) {  
  let children = []  
  fs.readdirSync(dir).forEach(function(filename){
      let path = dir+"/"+filename  
      let stat = fs.statSync(path)  
      if (stat && stat.isDirectory()) {  
          children.push([filename,walk(path)]); 
      }  
      else {  
          children.push([filename,path]);
      }  
  })  

  return children  
}  


const server = app.listen(3000, function(){
  const host = server.address().address;
  const port = server.address().port;
})
