const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const bodyParser = require('body-parser');
const express = require('express');


module.exports = function(app) {


  var router = express();
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  
  // Retrieve all users
  router.get("/", controller.findAll);

  // Update a User with username
  router.put("/:username", controller.update);

  //Retrieve all cameras associated with username
  router.get("/:username/cameras", controller.findCameras);

  //Retrieve all notifications associated with username
  router.get("/:username/notifications", controller.findNotifications);

  //Add cameras associated with username
  router.post("/:username/cameras/:id", controller.addCamera);

  // // Delete a User with username 
  // router.delete("/:username", controller.delete);

  // // Delete all Tutorials
  // router.delete("/", controller.deleteAll);

  app.use('/api/users', router);

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};