
/**
 * Module dependencies.
 */

var express = require('express'),
  Event = require('./models/event');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Expressjs sandbox'
  });
});

app.get('/calendar.json', function(req, res) {
  res.contentType('json');
  //res.end(JSON.stringify([{title:"Dynamic event", start:"2011-06-12 14:30:00",end:"2011-06-12 15:00:00",allDay:false}]));
  //res.end(JSON.stringify([new Event('Test 1', '2011-06-12 10:30:00', '2011-06-12 11:00:00', false)]));
  //res.end(JSON.stringify(Event.db));
  Event.all(function(whatever, arr){
    res.end(JSON.stringify(arr));
  });
});

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);
