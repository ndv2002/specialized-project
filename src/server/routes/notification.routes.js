const controller = require("../controllers/notification.controller");
const bodyParser = require('body-parser');
const express = require('express');


module.exports = function(app) {


  var router = express();
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  
  // Create camera
  router.post("/" , controller.send);

  

  app.use('/api/notifications', router);


};