var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');
router.get('/setsession/:name/:value', function (req, res) {
  req.session[req.params.name] = req.params.value;
  res.send(
    `Session with name as ${req.params.name} and value as ${req.params.value} is created `
  );
});
// router.get('/action/:name', function (req, res) {
//   req.session.name = req.params.name;
//   res.send(`Session name: ${req.params.name} and value is ${req.params.value}`);
// });
router.get('/delete/:name', function (req, res) {
  delete req.session[req.params.name];
  res.send(`Session with name ${req.params.name} is deleted `);
});
router.get('/destroy', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      res.send('Error while deleting');
    } else {
      res.send('Session destroyed');
    }
  });
});
module.exports = router;
