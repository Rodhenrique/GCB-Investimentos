"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();
var router = express.Router();

var TbEspecialidades = require('./especialidadeRepository');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
router.use(function (request, response, next) {
  console.log('middleware');
  next();
});
router.route('/especialidades').get(function (request, response) {
  TbEspecialidades.getOrders().then(function (result) {
    response.json(result[0]);
  })["catch"](function () {
    response.json('Deu erro!!!');
  });
});
var port = 5000;
app.listen(port);
console.log('API is runnning at ' + port);