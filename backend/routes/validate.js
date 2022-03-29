var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');
router.get('/createtable', function (req, res) {
  const sqlQuery = `CREATE TABLE validate(id int AUTO_INCREMENT PRIMARY KEY, username VARCHAR(25), password VARCHAR(100), date_of_creation DATE)`;
  connector.query(sqlQuery, function (err, results, fields) {
    res.json(results);
  });
});

router.post('/', function (req, res) {
  const { id, username, password } = req.body;
  let date_of_creation = new Date();
  connector.query(
    "SELECT username FROM validate where username = '" +
      req.body.username +
      "'",
    function (err, result, field) {
      if (result.length === 0) {
        const sql = `INSERT INTO validate VALUES (?,?,?, ?)`;
        connector.query(
          sql,
          [id, username, password, date_of_creation],
          function (err, results, fields) {
            res.json({ status: 1, data: 'user created' });
          }
        );
      } else {
        res.json({ status: 0, debug_data: 'username already exists' });
      }
    }
  );
});

router.post('/checklogin/:username/:password', function (req, res) {
  let username = req.params.username;
  let password = req.params.password;
  connector.query(
    "SELECT * FROM validate where username = '" +
      username +
      "' AND password = '" +
      password +
      "'",
    function (err, result, field) {
      if (result.length === 0) {
        req.session.isLoggedIn = 0;
        res.json({ status: 0, data: 'incorrect login details' });
      } else {
        req.session.isLoggedIn = 1;
        req.session.username = req.params.username;
        res.json({
          status: 1,
          data: username,
        });
      }
    }
  );
});

router.get('/login', function (req, res) {
  if (req.session.isLoggedIn === 1) {
    let sql = `select * from validate where username=?`;
    connector.query(sql, [req.session.username], function (err, results) {
      if (err) {
        res.json(err);
      } else {
        res.json({ status: 1, data: results });
      }
    });
  } else {
    res.json({ status: 0, debug_data: 'you are not logged in' });
  }
});

router.get('/', function (req, res) {
  const sqlQuery = `SELECT * FROM validate`;
  connector.query(sqlQuery, function (err, results) {
    if (err) {
      res.json({ err });
    } else {
      res.json({ results });
    }
  });
});

router.put('/:id', (req, res) => {
  const { username, password, date_of_creation } = req.body;
  const sql = `update validate set username=?, password=?, date_of_creation=? where id="${req.params.id}";`;
  connector.query(
    sql,
    [username, password, date_of_creation],
    (error, result) => {
      res.json({ error, result });
    }
  );
});

router.delete('/:id', (req, res) => {
  const sql = `delete from validate where id="${req.params.id}";`;
  connector.query(sql, (error, result) => {
    res.json({ error, result });
  });
});

router.delete('/deleteall/all', (req, res) => {
  const sql = 'truncate table validate';
  connector.query(sql, (error, result) => {
    res.json({ error, result });
  });
});

module.exports = router;
