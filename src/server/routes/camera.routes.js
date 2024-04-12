const controller = require("../controllers/camera.controller");
const bodyParser = require('body-parser');
const express = require('express');


module.exports = function(app) {


  var router = express();
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  
  // Create camera
  router.post("/" , controller.create);

  // Retrieve all cameras
  router.get("/", controller.findAll);

  // Update a camera with ip_address
  router.put("/:ip_address", controller.update);

  // // Delete a User with username 
  // router.delete("/:username", controller.delete);

  // // Delete all Tutorials
  // router.delete("/", controller.deleteAll);

  app.use('/api/cameras', router);


};