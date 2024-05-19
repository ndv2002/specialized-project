const controller = require("../controllers/data.controller");
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
  router.put("/:id", controller.update);

  //Retrieve all users associated with camera by ip address
  router.get("/:id/users", controller.findUser);

  

  // // Delete a User with username 
  // router.delete("/:username", controller.delete);

  // // Delete all Tutorials
  // router.delete("/", controller.deleteAll);

  app.use('/api/datas', router);


};