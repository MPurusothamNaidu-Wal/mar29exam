var express = require('express');
var router = express.Router();

router.get('/user/:name/:age/:city', function (req, res) {
  const cookieObj = {
    name: req.params.name,
    age: req.params.age,
    city: req.params.city,
  };
  const cookiejson = JSON.stringify(cookieObj);
  res.cookie('Cookie', cookiejson);
  res.send(cookiejson);
});

router.get('/', function (req, res) {
  res.send(req.cookies);
});

module.exports = router;
