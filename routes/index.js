var express = require('express');
var router = express.Router();
var db = require('../queries');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/api/v1/drivers', db.getAllDrivers);
router.get('/api/v1/drivers/:id', db.getSingleDriver);
router.post('/api/v1/drivers', db.createDriver);
router.put('/api/v1/drivers/:id', db.updateDriver);
router.delete('/api/v1/drivers/:id', db.removeDriver);

module.exports = router;
