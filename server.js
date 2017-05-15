var express = require('express');
var app = express();
var path = require('path');
var execPhp = require('exec-php');
var fs = require('fs');
var public = path.join(__dirname, '/public');
var suoro = require('./audio');

var server = app.listen(8080, function(){
	console.log("Aplication Running");
});

var queque = 0;
var current = [0,0,0,0,0,0,0,0];
var lastCall = 0;
var lastLoket = 0;
var code = 0;
var playlistrecall = [];

app.use('/', express.static(public));

app.get('/view', function (req, res) {
  res.sendFile(public+'/view.html');
});

app.get('/console', function (req, res) {
  res.sendFile(public+'/console.html');
});

app.get('/1', function (req, res) {
  res.sendFile(public+'/1.html');
});

app.get('/2', function (req, res) {
  res.sendFile(public+'/2.html');
});

app.get('/3', function (req, res) {
  res.sendFile(public+'/3.html');
});

app.get('/4', function (req, res) {
  res.sendFile(public+'/4.html');
});

app.get('/5', function (req, res) {
  res.sendFile(public+'/5.html');
});

app.get('/6', function (req, res) {
  res.sendFile(public+'/6.html');
});

app.get('/7', function (req, res) {
  res.sendFile(public+'/7.html');
});

app.get('/8', function (req, res) {
  res.sendFile(public+'/8.html');
});

app.get('/api/recall/:loket',function(req, res){
	code=2;
	var temp=parseInt(req.params.loket);
	var call = current[temp-1];
	var transcript = suoro.terbilang(call.toString(), req.params.loket);
	playlistrecall = transcript;
	res.json({msg:"playlist saved"});
});

app.get('/api/transcript/recall',function(req, res){
	code=0;
	res.json({transcript:playlistrecall});
});

app.get('/api/transcript/last',function(req, res){
	var bil = lastCall.toString();
	var transcript = suoro.terbilang(bil, lastLoket);
	code=0;
	res.json({transcript:transcript});
});

app.get('/api/customer', function(req, res){
	queque++;
	res.json({queque:queque,lastcall:lastCall});
});

app.get('/api/view', function(req, res){
	res.json({current:current});
});

app.get('/api/callnext/:loket', function(req, res){
	code=1;
	var temploket = req.params.loket;
	var loket = parseInt(temploket);
	lastCall++;
	current[loket-1]=lastCall;
	lastLoket=req.params.loket;
	res.json({lastcall:lastCall});	
});

app.get('/api/cek', function(req, res){
	res.json({queque:queque,lastcall:lastCall,lastloket:lastLoket,current:current,code:code});
});
