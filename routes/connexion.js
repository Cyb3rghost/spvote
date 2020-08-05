var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('../views/connexion', {
    user: req.session.userId,
    username: req.session.userName
  });
});

module.exports = router;
