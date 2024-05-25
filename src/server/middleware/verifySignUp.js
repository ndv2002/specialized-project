const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    
    if (user) {

      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
    next();
    
  });

};

checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
    
    if (!ROLES.includes(req.body.role)) {
      res.status(400).send({
        message: "Failed! Role does not exist = " + req.body.role
      });
      return;
    }
    
  }
  
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;