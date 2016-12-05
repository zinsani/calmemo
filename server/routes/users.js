var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var debug = require('debug')('app:calmemoserver:users');

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 30,
  host: '127.0.0.1',
  user: 'calmemo',
  password: '00000123',
  port: 3306,
  database: "calmemo"
});



/* POST users listing. commonauth/login */
router.post('/', function (req, res, next) {
  var insert_query = "insert into users set ? ";
  var users = {
    display_name: mysql.escape(req.body.display_name),
    email: mysql.escape(req.body.email),
    photo_url: mysql.escape(req.body.photo_url),
    write_dt: 'NOW()'
  };

  pool.getConnection(function (err, connection) {
    // Use the connection
    connection.query(insert_query, users, function (err, rows) {
      // And done with the connection.
      res.json(rows);
      connection.release();
      // Don't use the connection here, it has been returned to the pool.
    });
  });

  
});

/* GET users listing. commonauth/login */
router.get('/', function (req, res) {
  debug(req.query.userId);
  debug(req.query.address);
  debug(req.query.userId);

  var user = {
    'userid': req.query.userId,
    'name': req.query.name,
    'address': req.query.address,
  };

  var dynamicQuery = '';

  if (typeof user.userid != 'undefined') {
    dynamicQuery += ' and userid = ' + mysql.escape(user.userid);
  }

  if (typeof user.address != 'undefined') {
    dynamicQuery += ' and address = ' + mysql.escape(user.address);
  }

  if (typeof user.name != 'undefined') {
    dynamicQuery += ' and name = ' + mysql.escape(user.name);
  }

  debug("bsoh : " + dynamicQuery);

  var finamQuery = 'select * from users where 1=1 ' + dynamicQuery;
  debug(" finamQuery : " + finamQuery);

  pool.getConnection(function (err, connection) {
    // Use the connection

    connection.query(finamQuery, function (err, rows) {
      // And done with the connection.
      debug(rows);
      res.json(rows);

      connection.release();
      // Don't use the connection here, it has been returned to the pool.
      debug(err);
    });
  });
});


router.put('/', function (req, res) {
  var user_id = req.body.user_id,
    password = req.body.password;

  console.log(user_id);
  console.log(password);

  pool.getConnection(function (err, connection) {
    // Use the connection

    connection.query(finamQuery, function (err, rows) {
      // And done with the connection.
      debug(rows);
      res.json(rows);

      connection.release();
      // Don't use the connection here, it has been returned to the pool.
      debug(err);
    });
  });

});


module.exports = router;