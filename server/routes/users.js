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
  var insert_query = 'insert into users set ? ,write_dt = now()';
  var users = {
    display_name: req.body.display_name,
    email: req.body.email,
    photo_url: req.body.photo_url
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
  var user = {
    'users_uid': req.query.users_uid,
    'display_name': req.query.display_name,
    'email': req.query.email,
  };

  var dynamicQuery = '';

  if (typeof user.users_uid != 'undefined') {
    dynamicQuery += ' and users_uid = ' + mysql.escape(user.users_uid);
  }

if (typeof user.email != 'undefined') {
    dynamicQuery += ' and email = ' + mysql.escape(user.email);
  }

  if (typeof user.display_name != 'undefined') {
    dynamicQuery += ' and display_name = ' + mysql.escape(user.display_name);
  }

  

  console.log("bsoh : " + dynamicQuery);

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