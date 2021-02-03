"use strict";

var config = require('./config');

var sql = require('mssql');

function getOrders() {
  var pool, especialidades;
  return regeneratorRuntime.async(function getOrders$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM Tb_Especialidades"));

        case 6:
          especialidades = _context.sent;
          return _context.abrupt("return", especialidades.recordsets);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

module.exports = {
  getOrders: getOrders
};