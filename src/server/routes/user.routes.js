const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {


  var router = require("express").Router();


  // Retrieve all Users
  router.get("/", controller.findAll);


  // Retrieve a single Tutorial with Username
  router.get("/:username", controller.findOne);

  // Update a User with username
  router.put("/:username", controller.update);

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