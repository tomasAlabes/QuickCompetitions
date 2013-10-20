'use strict';

var express = require('express'),
    mongoose = require('mongoose');

var app = express();

// model
mongoose.connect('mongodb://localhost/quickCompetitions');

var Competition = mongoose.model('Competition', new mongoose.Schema({
  participants: [],
  criteria: []
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/api/competitions/:id', function (req, res) {
  return Competition.findById(req.params.id, function (err, todo) {
    if (!err) {
      return res.send(todo);
    }
  });
});

app.put('/api/competitions/:id', function (req, res) {
  return Competition.findById(req.params.id, function (err, todo) {
    todo.text = req.body.text;
    todo.done = req.body.done;
    todo.order = req.body.order;
    return todo.save(function (err) {
      if (!err) {
        console.log('updated');
      }
      return res.send(todo);
    });
  });
});

app.post('/api/competitions', function (req, res) {
  var todo;
  todo = new Competition({
    text: req.body.text,
    done: req.body.done,
    order: req.body.order
  });
  todo.save(function (err) {
    if (!err) {
      return console.log('created');
    }
  });
  return res.send(todo);
});

app.delete('/api/competitions/:id', function (req, res) {
  return Competition.findById(req.params.id, function (err, todo) {
    return todo.remove(function (err) {
      if (!err) {
        console.log('removed');
        return res.send('');
      }
    });
  });
});

app.listen(3000);
