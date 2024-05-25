const controller = require("../controllers/camera.controller");
const bodyParser = require('body-parser');
const express = require('express');


module.exports = function(app) {


  var router = express();
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  
  // Create camera

   
  router.post("/" , controller.create);

  


  router.get("/", controller.findAll);

  // Update a camera with id
  router.put("/:id", controller.update);

  //Retrieve all users associated with camera by id
  router.get("/:id/users", controller.findUsers);
  //Retrieve all notifications associated with camera by id
  router.get("/:id/notifications", controller.findNotifications);



  

  // // Delete a User with username 
  // router.delete("/:username", controller.delete);

  // // Delete all Tutorials
  // router.delete("/", controller.deleteAll);

  app.use('/api/cameras', router);


};